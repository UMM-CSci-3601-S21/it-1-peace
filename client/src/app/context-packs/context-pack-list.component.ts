import { Component, OnInit, OnDestroy } from '@angular/core';
import { CtxPk } from './context-pack';
import { CtxPkService } from './context-pack.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-context-pack-list-component',
  templateUrl: 'context-pack-list.component.html',
  styleUrls: ['./context-pack-list.component.scss'],
  providers: []
})

export class CtxPkListComponent implements OnInit, OnDestroy  {
  // These are public so that tests can reference them (.spec.ts)
  //public serverFilteredUsers: User[];
  //public filteredUsers: User[];

  public ctxPk$schema: string;
  public ctxPkName: string;
  public ctxPkIcon: string;
  public ctxPkEnabled: boolean;
  //public ctxPkWordpakc: ?; //Will be a new type wordlists
  getCtxPksSub: Subscription;


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
      //role: this.userRole,
      //age: this.userAge
    }).subscribe(returnedCtxPkss => {
      //this.serverFilteredUsers = returnedUsers;
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }

  public updateFilter(): void {
    //this.filteredUsers = this.userService.filterUsers(
      //this.serverFilteredUsers, { name: this.userName, company: this.userCompany });
  }


  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  ngOnInit(): void {
    //this.getFromServer();
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
