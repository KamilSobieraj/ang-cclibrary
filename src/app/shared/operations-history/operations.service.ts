import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
import { UserService } from '../../dashboard/user.service';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../../core/database.service';
import { BooksService } from '../../library/books.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Operation } from './operation.model';
import { BookModel } from '../../library/book.model';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from '../../dashboard/auth.service';
import {CurrentBorrowedBookBasic} from '../user-current-borrowed-books/currentBorrowedBookBasic.model';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  currentUserOperationsIDS: Operation[];
  allOperationsData: Operation[];
  operationsData$ = new BehaviorSubject<Operation[]>([]);
  operationsHistoryDataForTable$ = new BehaviorSubject<BookModel[]>(null);
  operationsHistoryTableDataSource$ = new Subject<MatTableDataSource<any>>();
  currentUserBorrowedBooksBasicData: CurrentBorrowedBookBasic[];

  constructor(
    private userService: UserService,
    private httpClient: HttpClient,
    private databaseService: DatabaseService,
    private booksService: BooksService,
    private authService: AuthService
  ) {
    this.getOperationsDataFromDB().subscribe((operationsData: Operation[]) => {
      this.allOperationsData = operationsData;
    });
    this.userService.currentUserOperationsIDS$.subscribe(
      currentUserOperationsIDSHistory =>
        (this.currentUserOperationsIDS = currentUserOperationsIDSHistory)
    );
    this.userService.currentBorrowedBooksBasicData$.subscribe(
      currentUserBorrowedBooks =>
        (this.currentUserBorrowedBooksBasicData = currentUserBorrowedBooks)
    );
  }

  getOperationsDataFromDB(): Observable<any> {
    return this.databaseService.getData('operations');
  }

  getOperationsData(): Observable<Operation[]> {
    this.userService.currentUserOperationsIDS$.next(
      this.userService.currentUserData.history
    );
    this.operationsData$.next(this.allOperationsData);
    return this.operationsData$.asObservable();
  }

  setCurrentUserBorrowedBooksDetails() {
    const borrowedBooksDetails = [];
    this.userService.getCurrentUserCurrentBorrowedBooksBasicData().subscribe();
    this.currentUserBorrowedBooksBasicData.map(borrowDetails => {
      const borrowedBookDate = this.getOperationData(borrowDetails.operationID)
        .date;
      const bookID = this.getOperationData(borrowDetails.operationID).bookID;
      const borrowedBookTitle = this.booksService.getBookDetails(bookID).title;
      borrowedBooksDetails.push({
        borrowedBookTitle,
        borrowedBookDate,
        bookID
      });
    });
    this.userService.currentBorrowedBooksDetails$.next(borrowedBooksDetails);
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

  onBookAction(actionType: string, bookID): void {
    const operationID = `${actionType}-${uuid.v4()}`;
    const bookData = this.booksService.getBookDetails(bookID);
    bookData.history.push(operationID);
    bookData.isAvailable = actionType === 'return';
    this.booksService.sendUpdatedBookDataToDB(bookData, bookID);
    this.addNewOperation(actionType, operationID, bookID);
  }

  addNewOperation(operationType: string, operationID: string, bookID: string): void {
    this.userService.addNewOperationToCurrentUser(operationID, bookID);
    const newOperation = {
      id: operationID,
      bookID,
      date: this.getCurrentDate(),
      userID: this.authService.getCurrentUserID(),
      operationType,
      movedTo: 'somewhere'
    };
    this.httpClient
      .post<any>(
        this.databaseService.databaseURL + '/operations/',
        JSON.stringify(newOperation),
        this.databaseService.httpOptions
      )
      .subscribe();
    this.allOperationsData.push(newOperation);
    this.userService.allOperationsData.push(newOperation);
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${currentDate.getMonth() +
      1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  }

  getBookData(operationID: string): BookModel {
    const bookID = this.getBookIDFromOperations(operationID);
    return this.booksService.getBookDetails(bookID);
  }

  getBookIDFromOperations(operationID: string): string {
    let bookID;
    this.allOperationsData.map(operationData => {
      if (operationData.id === operationID) {
        bookID = operationData.bookID.toString();
      }
    });
    return bookID;
  }

  setOperationsHistoryData(): void {
    const historySet = [];
    this.currentUserOperationsIDS.map(operationID => {
      const newPosition = this.getBookData(operationID.toString());
      historySet.push({ ...newPosition, operationID });
      historySet.map(operation => {
        this.allOperationsData
          .filter(
            operationFromDB => operationFromDB.id === operation.operationID
          )
          .map(op => (operation.operationDate = op.date));
      });
      historySet.map(operation => {
        if (operation.operationID.includes('borrow')) {
          operation.operationType = 'Wypożyczono';
        } else {
          operation.operationType = 'Oddano';
        }
      });
    });
    // ? changing property name 'id' to 'bookID'
    historySet.map(element => {
      element.bookID = element.id;
      delete element.id;
    });
    this.operationsHistoryDataForTable$.next(historySet.reverse());
    this.operationsHistoryTableDataSource$.next(
      new MatTableDataSource(historySet)
    );
  }
}
