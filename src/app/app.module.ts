import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksListComponent } from './library/books-list/books-list.component';
import { BookDetailsComponent } from './library/book-details/book-details.component';
import { OrderPanelComponent } from './order-panel/order-panel.component';
import { ReserveBookComponent } from './order-panel/reserve-book/reserve-book.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { LibraryComponent } from './library/library.component';
import { DashboardPanelComponent } from './dashboard/dashboard-panel/dashboard-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './core/navbar/navbar.component';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatTableModule
} from '@angular/material';
import { LoginPanelComponent } from './dashboard/login-panel/login-panel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmailPasswordFormComponent } from './shared/email-password-form/email-password-form.component';
import {AdminDashboardComponent} from './dashboard/admin-dashboard/admin-dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './shared/material-module';
import { SearchBarComponent } from './library/search-bar/search-bar.component';
import { BookDetailsElementComponent } from './shared/book-details-element/book-details-element.component';
import { BookAvailabilityDetailComponent } from './library/book-details/book-availability-detail/book-availability-detail.component';
import { BookTagsDetailComponent } from './library/book-details/book-tags-detail/book-tags-detail.component';
import {UserDashboardComponent} from './dashboard/user-dashboard/user-dashboard.component';
import { AddNewBookComponent } from './dashboard/admin-dashboard/add-new-book/add-new-book.component';
import { BookOperationsHistoryListComponent } from './library/book-details/book-operations-history-list/book-operations-history-list.component';
import { AddNewUserComponent } from './dashboard/admin-dashboard/add-new-user/add-new-user.component';
import { UpdateBookComponent } from './dashboard/admin-dashboard/update-book/update-book.component';
import { BookFormComponent } from './shared/book-form/book-form.component';
import { BookFormTagsComponent } from './shared/book-form/book-form-tags/book-form-tags.component';
import { ModalComponent } from './shared/modal/modal.component';
import { UsersManagementComponent } from './dashboard/admin-dashboard/users-management/users-management.component';
import { UserDetailsComponent } from './dashboard/admin-dashboard/users-management/user-details/user-details.component';
import {OperationsHistoryComponent} from './shared/operations-history/operations-history.component';
import { GoBackButtonComponent } from './shared/go-back-button/go-back-button.component';
import { UserCurrentBorrowedBooksComponent } from './shared/user-current-borrowed-books/user-current-borrowed-books.component';
import { TagsListComponent } from './library/tags-list/tags-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailsComponent,
    OrderPanelComponent,
    ReserveBookComponent,
    PageNotFoundComponent,
    LibraryComponent,
    DashboardPanelComponent,
    NavbarComponent,
    LoginPanelComponent,
    EmailPasswordFormComponent,
    AdminDashboardComponent,
    SearchBarComponent,
    BookDetailsElementComponent,
    BookAvailabilityDetailComponent,
    BookTagsDetailComponent,
    UserDashboardComponent,
    AddNewBookComponent,
    BookOperationsHistoryListComponent,
    AddNewUserComponent,
    UpdateBookComponent,
    BookFormComponent,
    BookFormTagsComponent,
    ModalComponent,
    UsersManagementComponent,
    UserDetailsComponent,
    OperationsHistoryComponent,
    GoBackButtonComponent,
    UserCurrentBorrowedBooksComponent,
    TagsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatListModule,
    MatTableModule,
    MaterialModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
