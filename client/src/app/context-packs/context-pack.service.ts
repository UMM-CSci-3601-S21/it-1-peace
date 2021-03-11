import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CtxPk } from './context-pack';
import { map } from 'rxjs/operators';

@Injectable()
export class CtxPkService {
  readonly ctxPkUrl: string = environment.apiUrl + 'context-packs';

  constructor(private httpClient: HttpClient) {
  }


  getCtxPks(filters?: { $schema?: string; name?: string; enabled?: string }): Observable<CtxPk[]> {

    let httpParams: HttpParams = new HttpParams();

    if (filters) {
      if (filters.$schema) {
        httpParams = httpParams.set('$schema', filters.$schema);
      }
      if (filters.name) {
        httpParams = httpParams.set('name', filters.name);
      }
      if (filters.enabled) {
        httpParams = httpParams.set('enabled', filters.enabled);
      }
      /* Wordpacks
      if (filters.) {
        httpParams = httpParams.set('enabled', filters.enabled);
      }
      */
    }
    return this.httpClient.get<CtxPk[]>(this.ctxPkUrl, {
      params: httpParams,
    });
  }
  /*
  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(this.userUrl + '/' + id);
  }

  filterUsers(users: User[], filters: { name?: string; company?: string }): User[] {

    let filteredUsers = users;

    // Filter by name
    if (filters.name) {
      filters.name = filters.name.toLowerCase();

      filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().indexOf(filters.name) !== -1);
    }

    // Filter by company
    if (filters.company) {
      filters.company = filters.company.toLowerCase();

      filteredUsers = filteredUsers.filter(user => user.company.toLowerCase().indexOf(filters.company) !== -1);
    }

    return filteredUsers;
  }

  addUser(newUser: User): Observable<string> {
    // Send post request to add a new user with the user data as the body.
    return this.httpClient.post<{id: string}>(this.userUrl, newUser).pipe(map(res => res.id));
  }
  */
}
