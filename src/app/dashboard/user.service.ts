import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';
import {AuthService} from './auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {DatabaseService} from '../core/database.service';
import {BooksService} from '../library/books.service';
import {Operation} from '../order-panel/operation.model';
import {CurrentBorrowedBookBasic} from './currentBorrowedBookBasic.model';
import {CurrentBorrowedBookDetails} from './currentBorrowedBookDetails.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserOperationsIDS$ = new BehaviorSubject([]);

  currentUserData$ = new BehaviorSubject<User>(null);
  currentUserData: User;
  currentBorrowedBooksBasicData$ = new BehaviorSubject<CurrentBorrowedBookBasic[]>([]);
  currentBorrowedBooksDetails$ = new BehaviorSubject<CurrentBorrowedBookDetails[]>(null);
  allOperationsData: Operation[];
  allOperationsData$ = new BehaviorSubject<Operation[]>(null);
  allUsersData: User[];

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
    this.allOperationsData$.subscribe(allOperationsData => this.allOperationsData = allOperationsData);
    this.databaseService.getData('users').subscribe(allUsersData => this.allUsersData = allUsersData)
  }

  getOperationsDataFromDB(): Observable<any> {
    return this.databaseService.getData('operations');
  }

  getCurrentUserDataFromDB(): Observable<User> {
    return this.httpClient.get<User>(this.databaseService.databaseURL + '/users/' + this.authService.getCurrentUserID());
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
      .put<User>(this.databaseService.databaseURL + '/users/' + this.authService.getCurrentUserID(),
        JSON.stringify(newUserData),
        this.databaseService.httpOptions)
      .subscribe();
  }

  getCurrentUserCurrentBorrowedBooks(): Observable<CurrentBorrowedBookBasic[]> {
    this.currentBorrowedBooksBasicData$.next(this.currentUserData.currentBorrowedBooks);
    return this.currentBorrowedBooksBasicData$.asObservable();
  }

  removeBookFromBorrowed(bookID: string): void {
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
    this.currentBorrowedBooksDetails$.next(borrowedBooks);
    this.currentBorrowedBooksBasicData$.next(this.currentUserData.currentBorrowedBooks);
  }

  getCurrentUserBorrowedBooksDetails(): CurrentBorrowedBookDetails[] {
    const borrowedBooksDetails = [];
    this.currentUserData.currentBorrowedBooks.map(borrowDetails => {
      const borrowedBookDate = this.getOperationData(borrowDetails.operationID).date;
      const bookID = this.getOperationData(borrowDetails.operationID).bookID;
      const borrowedBookTitle = this.booksService.getBookDetails(bookID).title;
      borrowedBooksDetails.push({borrowedBookTitle, borrowedBookDate, bookID});
    });
    return borrowedBooksDetails;
  }

  getOperationData(operationID: string): Operation {
    let operationOutput;
    this.allOperationsData.map(operation => {
      if (operation.id === operationID) {
        operationOutput = operation;
      }
    });
    return operationOutput;
  }

  getUserDataByID(id: string): User[] {
    return this.allUsersData.filter(userData => {
      if (userData.id === id) {
        return userData;
        }
      }
    );
  }
}
