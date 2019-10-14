import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
import {UserService} from '../dashboard/user.service';
import {HttpClient} from '@angular/common/http';
import {DatabaseService} from '../core/database.service';
import {BooksService} from '../library/books.service';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private userService: UserService,
              private httpClient: HttpClient,
              private database: DatabaseService,
              private booksService: BooksService) {
  }

  addNewOrderOperation() {
    const operationID = `borrow${uuid.v4()}`;
    const bookData = this.booksService.getBookDetails();
    bookData.history.push(operationID);
    this.userService.addNewOrderOperationToCurrentUser(operationID, bookData.id);
    const newOperation = {
      id: operationID,
      bookID: bookData.title,
      date: new Date(),
      userID: this.userService.getCurrentUserID(),
      operationType: 'order',
      movedTo: 'w chuj'
    };
    this.httpClient.post<any>(this.database.databaseURL + '/operations/', JSON.stringify(newOperation), this.database.httpOptions)
      .subscribe();
  }

  addReturnBookOperation() {
    const operationID = `return${uuid.v4()}`;
    const bookData = this.booksService.getBookDetails();
    bookData.history.push(operationID);
    this.userService.addNewReturnOperationToCurrentUser(operationID, bookData.id);
    const newOperation = {
      id: operationID,
      bookID: bookData.title,
      date: new Date(),
      userID: this.userService.getCurrentUserID(),
      operationType: 'return',
      movedTo: 'w chuj'
    };
    this.httpClient.post<any>(this.database.databaseURL + '/operations/', JSON.stringify(newOperation), this.database.httpOptions)
      .subscribe();
  }
}
