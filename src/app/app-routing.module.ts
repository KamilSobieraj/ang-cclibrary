import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {LibraryComponent} from './library/library.component';
import {DashboardPanelComponent} from './dashboard/dashboard-panel/dashboard-panel.component';
import {LoginPanelComponent} from './dashboard/login-panel/login-panel.component';
import {AdminDashboardComponent} from './dashboard/admin-dashboard/admin-dashboard.component';
import {BookDetailsComponent} from './library/book-details/book-details.component';
import {AuthGuard} from './dashboard/auth.guard';
import {AddNewUserComponent} from './dashboard/admin-dashboard/add-new-user/add-new-user.component';
import {AddNewBookComponent} from './dashboard/admin-dashboard/add-new-book/add-new-book.component';
import {AdminGuard} from './dashboard/admin-dashboard/admin.guard';
import {UpdateBookComponent} from './dashboard/admin-dashboard/update-book/update-book.component';
import {UsersManagementComponent} from './dashboard/admin-dashboard/users-management/users-management.component';
import {UserDetailsComponent} from './dashboard/admin-dashboard/users-management/user-details/user-details.component';
import {TagsListComponent} from './library/tags-list/tags-list.component';
import {ResetUserPasswordComponent} from './shared/reset-user-password/reset-user-password.component';

const routes: Routes = [
  {path: 'library', component: LibraryComponent},
  {path: 'library/book-details/:id', component: BookDetailsComponent},
  {path: 'library/tags-list', component: TagsListComponent},
  {path: 'dashboard', component: DashboardPanelComponent, canActivate: [AuthGuard]},
  {path: 'dashboard/admin', component: AdminDashboardComponent, canActivate: [AdminGuard]},
  {path: 'dashboard/admin/users/add-new-user', component: AddNewUserComponent, canActivate: [AdminGuard]},
  {path: 'dashboard/admin/books', component: AddNewBookComponent, canActivate: [AdminGuard]},
  {path: 'dashboard/admin/update-book', component: UpdateBookComponent, canActivate: [AdminGuard]},
  {path: 'dashboard/admin/users', component: UsersManagementComponent, canActivate: [AdminGuard]},
  {path: 'dashboard/admin/users/:userID', component: UserDetailsComponent, canActivate: [AdminGuard]},
  {path: 'dashboard/admin/users/:userID/resetpassword', component: ResetUserPasswordComponent},
  {path: 'dashboard/resetpassword', component: ResetUserPasswordComponent},
  {path: 'login', component: LoginPanelComponent},
  {path: '', redirectTo: '/library', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
