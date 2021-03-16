import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { WordList } from './word-list';
import { map } from 'rxjs/operators';

@Injectable()
export class WordListService {
  readonly wordListUrl: string = environment.apiUrl + 'word-list';

  constructor(private httpClient: HttpClient) {
  }

  getWordLists(filters?: { enabled?: boolean; name?: string}): Observable<WordList[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.enabled) {
        httpParams = httpParams.set('enabled', filters.enabled.toString());
      }
      if (filters.name) {
        httpParams = httpParams.set('name', filters.name);
      }
    }
    return this.httpClient.get<WordList[]>(this.wordListUrl, {
      params: httpParams,
    });
  }

  filterWordLists(wordLists: WordList[], filters: { enabled?: boolean; name?: string}): WordList[] {

    let filteredWordLists = wordLists;

    // Filter by enabled or disabled
    if (filters.enabled) {
      filteredWordLists = filteredWordLists.filter(wordList => wordList.enabled === filters.enabled);
    }

    // Filter by name
    if (filters.name) {
      filters.name = filters.name.toLowerCase();
      filteredWordLists = filteredWordLists.filter(wordList => wordList.name === filters.name);
    }

    return filteredWordLists;
  }

  addWordList(newWordList: WordList): Observable<string> {
    // Send post request to add a new user with the user data as the body.
    return this.httpClient.post<{id: string}>(this.wordListUrl, newWordList).pipe(map(res => res.id));
  }

}
