import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
import {UserService} from '../dashboard/user.service';
import {HttpClient} from '@angular/common/http';
import {DatabaseService} from '../core/database.service';
import {BooksService} from '../library/books.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Operation} from './operation.model';
import {BookModel} from '../library/book.model';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  currentUserOperationsIDS: Operation[];
  allOperationsData: Operation[];
  allOperationsData$ = new BehaviorSubject<Operation[]>(null);
  operationsData$ = new BehaviorSubject<Operation[]>([]);
  operationsHistoryDataForTable$ = new BehaviorSubject<BookModel[]>(null);

  constructor(private userService: UserService,
              private httpClient: HttpClient,
              private databaseService: DatabaseService,
              private booksService: BooksService) {
    this.getOperationsDataFromDB()
      .subscribe((operationsData: Operation[]) => {
        this.allOperationsData$.next(operationsData);
        this.allOperationsData = operationsData;
      });
    this.userService.currentUserOperationsIDS$
      .subscribe(currentUserOperationsIDSHistory => this.currentUserOperationsIDS = currentUserOperationsIDSHistory);
  }

  getOperationsDataFromDB(): Observable<any> {
    return this.databaseService.getData('operations');
  }
  getOperationsData(): Observable<Operation[]> {
    this.operationsData$.next(this.allOperationsData);
    return this.operationsData$.asObservable();
  }

  addNewOperation(operationType: string, bookID: string) {
    const operationID = `${operationType}-${uuid.v4()}`;
    const bookData = this.booksService.getBookDetails(bookID);
    bookData.history.push(operationID);
    this.userService.addNewOperationToCurrentUser(operationID, bookData.id);
    const newOperation = {
      id: operationID,
      bookID: bookData.id,
      date: this.getCurrentDate(),
      userID: this.userService.getCurrentUserID(),
      operationType,
      movedTo: 'w chuj'
    };
    this.httpClient
      .post<any>(this.databaseService.databaseURL + '/operations/', JSON.stringify(newOperation), this.databaseService.httpOptions)
      .subscribe();
    this.allOperationsData.push(newOperation);
  }

  getCurrentDate() {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  }
  getBookData(operationID: string) {
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

  setOperationsHistoryData() {
    const historySet = [];
    this.currentUserOperationsIDS.map(operationID => {
      const newPosition = this.getBookData(operationID.toString());
      historySet.push({...newPosition, operationID});
      historySet.map((operation) => {
        this.allOperationsData.filter(operationFromDB => (operationFromDB.id === operation.operationID)).map(op => operation.operationDate = op.date);
      });
      historySet.map(operation => {
        if (operation.operationID.includes('borrow')) {
          operation.operationType = 'Wypożyczono';
        } else {
          operation.operationType = 'Oddano';
        }
      });
    });
    this.operationsHistoryDataForTable$.next(historySet);
  }
}
