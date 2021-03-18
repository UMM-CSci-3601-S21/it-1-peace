import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CtxPk } from './context-pack';
import { map } from 'rxjs/operators';
import { WordList } from '../word-lists/word-list';

@Injectable()
export class CtxPkService {
  readonly ctxPkUrl: string = environment.apiUrl + 'ctxPks';

  constructor(private httpClient: HttpClient) {
  }


  getCtxPks(filters?: { name?: string; enabled?: boolean }): Observable<CtxPk[]> {

    let httpParams: HttpParams = new HttpParams();

    if (filters) {
      if (filters.name) {
        httpParams = httpParams.set('name', filters.name);
      }
      if (filters.enabled) {
        httpParams = httpParams.set('enabled', filters.enabled.toString());
      }
    }
    return this.httpClient.get<CtxPk[]>(this.ctxPkUrl, {
      params: httpParams,
    });
  }

  getCtxPkById(id: string): Observable<CtxPk> {
    return this.httpClient.get<CtxPk>(this.ctxPkUrl + '/' + id);
  }

  filterCtxPks(ctxPks: CtxPk[], filters: { name?: string; enabled?: boolean }): CtxPk[] {

    let filteredCtxPks = ctxPks;

    // Filter by name
    if (filters.name) {
      filters.name = filters.name.toLowerCase();

      filteredCtxPks = filteredCtxPks.filter(ctxPk => ctxPk.name.toLowerCase().indexOf(filters.name) !== -1);
    }

    // Filter by company
    if (filters.enabled) {
      filteredCtxPks = filteredCtxPks.filter(ctxPk => ctxPk.enabled.toString().indexOf(filters.enabled.toString()) !== -1);
    }

    return filteredCtxPks;
  }


  addContextPack(newContextPack: CtxPk): Observable<string> {
    return this.httpClient.post<{name: string}>(this.ctxPkUrl, newContextPack).pipe(map(res => res.name));
  }

  addWordList(newWordList: WordList): Observable<string> {
    // Send post request to add a new user with the user data as the body.
    return this.httpClient.post<{id: string}>(this.ctxPkUrl, newWordList).pipe(map(res => res.id));
  }

}
