import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CtxPk } from '../app/context-packs/context-pack';
import { CtxPkService } from '../app/context-packs/context-pack.service';

/**
 * A "mock" version of the `CtxPkService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockCtxPkService extends CtxPkService {
  static testCtxPks: CtxPk[] = [
    {
      _id: '',
      name: '',
      icon: '',
      enabled: true,
      wordLists: []
    },
    {
      _id: '',
      name: '',
      icon: '',
      enabled: true,
      wordLists: []
    },
    {
      _id: '',
      name: '',
      icon: '',
      enabled: true,
      wordLists: []
     }
  ];

  constructor() {
    super(null);
  }

  getCtxPks(filters: { /*role?: UserRole; age?: number; company?: string */}): Observable<CtxPk[]> {
    // Just return the test users regardless of what filters are passed in
    return of(MockCtxPkService.testCtxPks);
  }

  getCtxPkById(id: string): Observable<CtxPk> {
    // If the specified ID is for the first test user,
    // return that user, otherwise return `null` so
    // we can test illegal user requests.
    if (id === MockCtxPkService.testCtxPks[0]._id) {
      return of(MockCtxPkService.testCtxPks[0]);
    } else {
      return of(null);
    }
  }

}
