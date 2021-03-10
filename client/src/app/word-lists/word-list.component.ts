import { Component, OnInit, OnDestroy } from '@angular/core';
import { WordList } from './word-list';
import { WordListService } from './word-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-word-list-component',
  templateUrl: 'word-list.component.html',
  styleUrls: ['./word-list.component.scss'],
  providers: []
})

export class WordListComponent implements OnInit, OnDestroy  {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredWordLists: WordList[];
  public filteredWordLists: WordList[];

  public wordListName: string;
  public wordListEnabled: boolean;
  getWordListsSub: Subscription;


  // Inject the WordListService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private wordListService: WordListService) {

  }

  getWordListsFromServer(): void {
    this.unsub();
    this.getWordListsSub = this.wordListService.getWordLists({
      name: this.wordListName,
      enabled: this.wordListEnabled
    }).subscribe(returnedWordLists => {
      this.serverFilteredWordLists = returnedWordLists;
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }

  public updateFilter(): void {
    this.filteredWordLists = this.wordListService.filterWordLists(
      this.serverFilteredWordLists, { name: this.wordListName, enabled: this.wordListEnabled });
  }

  /**
   * Starts an asynchronous operation to update the wordLists list
   *
   */
  ngOnInit(): void {
    this.getWordListsFromServer();
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  unsub(): void {
    if (this.getWordListsSub) {
      this.getWordListsSub.unsubscribe();
    }
  }
}
