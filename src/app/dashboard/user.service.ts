import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';
import {AuthService} from './auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {DatabaseService} from '../core/database.service';
import {BooksService} from '../library/books.service';
import {Operation} from '../order-panel/operation.model';
import {CurrentBorrowedBooks} from './currentBorrowedBooks.model';
import {OperationsService} from '../order-panel/operations.service';
import {BookModel} from '../library/book.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserOperationsIDS$ = new BehaviorSubject([]);
  currentBorrowedBooks$ = new BehaviorSubject<CurrentBorrowedBooks[]>([]);
  currentUserData$ = new BehaviorSubject<User>(null);
  currentUserData: User;
  abojawiem$ = new BehaviorSubject<any>(null);
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
        // this.allOperationsData = operationsData;
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

  getCurrentUserOperationsIDS(): Observable<Operation[]> {
    this.currentUserOperationsIDS$.next(this.currentUserData.history);
    return this.currentUserOperationsIDS$.asObservable();
  }

  getCurrentUserCurrentBorrowedBooks(): Observable<CurrentBorrowedBooks[]> {
    this.currentBorrowedBooks$.next(this.currentUserData.currentBorrowedBooks);
    return this.currentBorrowedBooks$.asObservable();
  }

  removeBookFromBorrowed(bookID: string) {
    const userData = this.currentUserData;
    //! tu wsadzisz getcurrent...Details
    const borrowedBooks = this.getCurrentUserBorrowedBooksDetails().filter(
      chosenBook => {
        console.log(chosenBook);
        return chosenBook.bookID !== bookID;
      }
    );
    this.currentUserData.currentBorrowedBooks = this.currentUserData.currentBorrowedBooks
      .filter(chosenBook => {
        return chosenBook.bookID !== bookID;
      }
    );
    this.sendUpdatedUserDataToDB(userData);
    this.abojawiem$.next(borrowedBooks);
    this.currentBorrowedBooks$.next(this.currentUserData.currentBorrowedBooks);

    this.booksService.changeBookAvailabilityStatusInDB(true, bookID);
  }





  getCurrentUserBorrowedBooksDetails() {
    const borrowedBooksDetails = [];
    this.currentUserData.currentBorrowedBooks.map(borrowDetails => {
      // console.log(this.allOperationsData);
      // console.log(borrowDetails.operationID);
      // console.log(this.getOperationData(borrowDetails.operationID));
      const borrowedBookDate = this.getOperationData(borrowDetails.operationID).date;
      const bookID = this.getOperationData(borrowDetails.operationID).bookID;
      const borrowedBookTitle = this.booksService.getBookDetails(bookID).title;
      borrowedBooksDetails.push({borrowedBookTitle, borrowedBookDate, bookID});
    });
    // console.log(borrowedBooksDetails);
    // this.abojawiem$.next(borrowedBooksDetails);
    return borrowedBooksDetails;
    // this.userService.currentBorrowedBooks$.next(borrowedBooksDetails);
  }

  getOperationData(operationID: string) {
    let operationOutput;
    //! Jakby tutaj pobierać na bieżąco wszystkie operacje, to rozizałoby problem
    this.allOperationsData.map(operation => {
      console.log(operation);
      if (operation.id === operationID) {
        operationOutput = operation;
      }
    });
    return operationOutput;
  }
}
