import { Component, OnInit, OnDestroy } from '@angular/core';
import { CtxPk } from './context-pack';
import { CtxPkService } from './context-pack.service';
import { Subscription } from 'rxjs';
import { WordList } from '../word-lists/word-list';

@Component({
  selector: 'app-context-pack-list-component',
  templateUrl: 'context-pack-list.component.html',
  styleUrls: ['./context-pack-list.component.scss'],
  providers: []
})

export class CtxPkListComponent implements OnInit, OnDestroy  {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredCtxPks: CtxPk[];
  public filteredCtxPks: CtxPk[];

  public ctxPkName: string;
  public ctxPkIcon: string;
  public ctxPkEnabled: boolean;
  public ctxPkWordlist: WordList;
  getCtxPksSub: Subscription;
  public viewType: 'card' | 'list' = 'card';


  // Inject the UserService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private ctxPkService: CtxPkService) {

  }

  getCtxPksFromServer(): void {
    this.unsub();
    this.getCtxPksSub = this.ctxPkService.getCtxPks({
      name: this.ctxPkName,
      enabled: this.ctxPkEnabled
    }).subscribe(returnedCtxPks => {
      this.serverFilteredCtxPks = returnedCtxPks;
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }

  public updateFilter(): void {
    this.filteredCtxPks = this.ctxPkService.filterCtxPks(
      this.serverFilteredCtxPks, { name: this.ctxPkName, enabled: this.ctxPkEnabled });
  }


  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  ngOnInit(): void {
    this.getCtxPksFromServer();
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  unsub(): void {
    if (this.getCtxPksSub) {
      this.getCtxPksSub.unsubscribe();
    }
  }

}
