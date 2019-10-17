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
  currentUserOperationsIDS$ = new BehaviorSubject([]);

  currentUserData$ = new BehaviorSubject<User>(null);
  currentUserData: User;
  currentBorrowedBooksBasicData$ = new BehaviorSubject<CurrentBorrowedBooks[]>([]);
  currentBorrowedBooks2$ = new BehaviorSubject<any>(null);
  allOperationsData: Operation[];
  allOperationsData$ = new BehaviorSubject<Operation[]>(null);

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private databaseService: DatabaseService,
              private booksService: BooksService) {
    this.getCurrentUserDataFromDB().subscribe((currentUserData: User) => {
      this.currentUserData$.next(currentUserData);
      this.currentUserData = currentUserData;
    });
    this.getOperationsDataFromDB()
      .subscribe((operationsData: Operation[]) => {
        this.allOperationsData$.next(operationsData);
      });
    this.allOperationsData$.subscribe(res => this.allOperationsData = res);
  }

  getOperationsDataFromDB(): Observable<any> {
    return this.databaseService.getData('operations');
  }

  getCurrentUserDataFromDB(): Observable<User> {
    return this.httpClient.get<User>(this.databaseService.databaseURL + '/users/' + this.getCurrentUserID());
  }

  getCurrentUserID(): string {
    return JSON.parse(localStorage.getItem('userData')).sub;
  }

  addNewOperationToCurrentUser(newOperationID: string, orderedBookID: string) {
    this.currentUserData.history.push(newOperationID);
    // If borrow book operation
    if (newOperationID.includes('borrow')) {
      this.currentUserData.currentBorrowedBooks.push({bookID: orderedBookID, operationID: newOperationID});
    }
    this.sendUpdatedUserDataToDB(this.currentUserData);
  }

  sendUpdatedUserDataToDB(newUserData: User) {
    this.httpClient
      .put<User>(this.databaseService.databaseURL + '/users/' + this.getCurrentUserID(),
        JSON.stringify(newUserData),
        this.databaseService.httpOptions)
      .subscribe();
  }

  getCurrentUserCurrentBorrowedBooks(): Observable<CurrentBorrowedBooks[]> {
    this.currentBorrowedBooksBasicData$.next(this.currentUserData.currentBorrowedBooks);
    return this.currentBorrowedBooksBasicData$.asObservable();
  }

  removeBookFromBorrowed(bookID: string) {
    const userData = this.currentUserData;
    const borrowedBooks = this.getCurrentUserBorrowedBooksDetails().filter(
      chosenBook => {
        return chosenBook.bookID !== bookID;
      }
    );
    this.currentUserData.currentBorrowedBooks = this.currentUserData.currentBorrowedBooks
      .filter(chosenBook => {
        return chosenBook.bookID !== bookID;
      }
    );
    this.sendUpdatedUserDataToDB(userData);
    this.currentBorrowedBooks2$.next(borrowedBooks);
    this.currentBorrowedBooksBasicData$.next(this.currentUserData.currentBorrowedBooks);
    this.booksService.changeBookAvailabilityStatusInDB(true, bookID);
  }

  getCurrentUserBorrowedBooksDetails() {
    const borrowedBooksDetails = [];
    this.currentUserData.currentBorrowedBooks.map(borrowDetails => {
      const borrowedBookDate = this.getOperationData(borrowDetails.operationID).date;
      const bookID = this.getOperationData(borrowDetails.operationID).bookID;
      const borrowedBookTitle = this.booksService.getBookDetails(bookID).title;
      borrowedBooksDetails.push({borrowedBookTitle, borrowedBookDate, bookID});
    });
    return borrowedBooksDetails;
  }

  getOperationData(operationID: string) {
    let operationOutput;
    this.allOperationsData.map(operation => {
      if (operation.id === operationID) {
        operationOutput = operation;
      }
    });
    return operationOutput;
  }
}
