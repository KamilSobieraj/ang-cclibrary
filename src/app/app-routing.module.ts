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

const routes: Routes = [
  {path: 'library', component: LibraryComponent},
  {path: 'library/book-details/:id', component: BookDetailsComponent},
  {path: 'order-panel', component: OrderPanelComponent},
  {path: 'dashboard', component: DashboardPanelComponent, canActivate: [AuthGuard]},
  {path: 'dashboard/admin', component: AdminDashboardComponent},
  {path: 'login', component: LoginPanelComponent},
  {path: '', redirectTo: '/library', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
