import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {LibraryComponent} from './library/library.component';
import {DashboardPanelComponent} from './dashboard/dashboard-panel/dashboard-panel.component';
import {LoginPanelComponent} from './dashboard/login-panel/login-panel.component';
import {AdminDashboardComponent} from './dashboard/admin-dashboard/admin-dashboard.component';
import {BookDetailsComponent} from './library/book-details/book-details.component';
import {OrderPanelComponent} from './order-panel/order-panel.component';
import {AuthGuard} from './dashboard/auth.guard';
import {AddNewUserComponent} from './dashboard/admin-dashboard/add-new-user/add-new-user.component';
import {AddNewBookComponent} from './dashboard/admin-dashboard/add-new-book/add-new-book.component';
import {AdminGuard} from './dashboard/admin-dashboard/admin.guard';

const routes: Routes = [
  {path: 'library', component: LibraryComponent},
  {path: 'library/book-details/:id', component: BookDetailsComponent},
  {path: 'order-panel', component: OrderPanelComponent},
  {path: 'dashboard', component: DashboardPanelComponent, canActivate: [AuthGuard]},
  {path: 'dashboard/admin', component: AdminDashboardComponent, canActivate: [AdminGuard]},
  {path: 'dashboard/admin/users', component: AddNewUserComponent, canActivate: [AdminGuard]},
  {path: 'dashboard/admin/books', component: AddNewBookComponent, canActivate: [AdminGuard]},
  {path: 'login', component: LoginPanelComponent},
  {path: '', redirectTo: '/library', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
