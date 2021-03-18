import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MockWordListService } from '../../testing/word-list.service.mock';
import { WordList } from './word-list';
import { WordListComponent } from './word-list.component';
import { WordListService } from './word-list.service';
import { MatIconModule } from '@angular/material/icon';

const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatIconModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('WordList list', () => {

  let wordLists: WordListComponent;
  let fixture: ComponentFixture<WordListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [WordListComponent],
      // providers:    [ WordListService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{ provide: WordListService, useValue: new MockWordListService() }]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(WordListComponent);
      wordLists = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the word lists', () => {
    expect(wordLists.serverFilteredWordLists.length).toBe(2);
  });

  it('contains a word list named \'farm_animals\'', () => {
    expect(wordLists.serverFilteredWordLists.some((wordList: WordList) => wordList.name === 'farm_animals')).toBe(true);
  });

  it('contain a word list named \'farm_equipment\'', () => {
    expect(wordLists.serverFilteredWordLists.some((wordList: WordList) => wordList.name === 'farm_equipment')).toBe(true);
  });

  it('doesn\'t contain a word list named \'Santa\'', () => {
    expect(wordLists.serverFilteredWordLists.some((wordList: WordList) => wordList.name === 'Santa')).toBe(false);
  });

  it('has two context packs that are enabled', () => {
    expect(wordLists.serverFilteredWordLists.filter((wordList: WordList) => wordList.enabled === true).length).toBe(2);
  });
});

describe('Misbehaving WordList List', () => {
  let wordLists: WordListComponent;
  let fixture: ComponentFixture<WordListComponent>;

  let userServiceStub: {
    getWordLists: () => Observable<WordList[]>;
    getWordListsFiltered: () => Observable<WordList[]>;
  };

  beforeEach(() => {
    // stub WordListService for test purposes
    userServiceStub = {
      getWordLists: () => new Observable(observer => {
        observer.error('Error-prone observable');
      }),
      getWordListsFiltered: () => new Observable(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [WordListComponent],
      // providers:    [ WordListService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{ provide: WordListService, useValue: userServiceStub }]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(WordListComponent);
      wordLists = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a WordListService', () => {
    // Since the observer throws an error, we don't expect users to be defined.
    expect(wordLists.serverFilteredWordLists).toBeUndefined();
  });
});
