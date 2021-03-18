import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';
import { AddUserComponent } from './users/add-user.component';

import { CtxPkListComponent } from './context-packs/context-pack-list.component';
import { WordListComponent } from './word-lists/word-list.component';
import { AddWordListComponent } from './word-lists/add-word-list.component';
import { AddContextPackComponent } from './context-packs/add-context-pack.component';
import { ContextPackProfileComponent } from './context-packs/context-pack-profile.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  //{path: 'users', component: UserListComponent},
  //{path: 'users/new', component: AddUserComponent},
  //{path: 'users/:id', component: UserProfileComponent},
  {path: 'context-packs', component: CtxPkListComponent},
  {path: 'context-packs/new', component: AddContextPackComponent},
  {path: 'context-packs/:id', component: ContextPackProfileComponent},
  {path: 'word-lists', component: WordListComponent},
  {path: 'word-lists/new', component: AddWordListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
