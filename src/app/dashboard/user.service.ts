import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';
import {AuthService} from './auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {DatabaseService} from '../core/database.service';
import {BooksService} from '../library/books.service';
import {Operation} from '../order-panel/operation.model';
import {CurrentBorrowedBooks} from './currentBorrowedBooks.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  operationsHistory$ = new BehaviorSubject([]);
  currentBorrowedBooks$ = new BehaviorSubject<CurrentBorrowedBooks[]>([]);
  currentUserData$ = new BehaviorSubject<User>(null);
  currentUserData: User;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private databaseService: DatabaseService,
              private booksService: BooksService) {
    this.getCurrentUserDataFromDB().subscribe((currentUserData: User) => {
      this.currentUserData$.next(currentUserData);
      this.currentUserData = currentUserData;
    });
  }

  getCurrentUserDataFromDB(): Observable<User> {
    return this.httpClient.get<User>(this.databaseService.databaseURL + '/users/' + this.getCurrentUserID());
  }

  getCurrentUserID(): string {
    return JSON.parse(localStorage.getItem('userData')).sub;
  }

  addNewOrderOperationToCurrentUser(newOperationID: string, orderedBookID: string) {
    this.currentUserData.history.push(newOperationID);
    this.currentUserData.currentBorrowedBooks.push({bookID: orderedBookID, operationID: newOperationID});
    this.sendUpdatedUserDataToDB(this.currentUserData);
  }

  sendUpdatedUserDataToDB(newUserData: User) {
    this.httpClient
      .put<User>(this.databaseService.databaseURL + '/users/' + this.getCurrentUserID(),
        JSON.stringify(newUserData),
        this.databaseService.httpOptions)
      .subscribe();
  }

  getCurrentUserOperations(): Observable<Operation[]> {
    this.operationsHistory$.next(this.currentUserData.history);
    return this.operationsHistory$.asObservable();
  }

  getCurrentUserCurrentBorrowedBooks(): Observable<CurrentBorrowedBooks[]> {
    this.currentBorrowedBooks$.next(this.currentUserData.currentBorrowedBooks);
    return this.currentBorrowedBooks$.asObservable();
  }

  removeBookFromBorrowed(bookID: string) {
    const userData = this.currentUserData;
    this.currentUserData.currentBorrowedBooks = this.currentUserData.currentBorrowedBooks
      .filter(chosenBook => {
        return chosenBook.bookID !== bookID;
      }
    );
    this.sendUpdatedUserDataToDB(userData);
    this.currentBorrowedBooks$.next(this.currentUserData.currentBorrowedBooks);
    this.booksService.changeBookAvailabilityStatusInDB(true, bookID);
  }
}
