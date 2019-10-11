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
    const operationIDD = `borrow${uuid.v4()}`;
    const bookData = this.booksService.getBookDetails();
    bookData.history.push(operationIDD);
    this.userService.addNewOrderOperationToCurrentUser(operationIDD, bookData.id);
    const newOperation = {
      id: operationIDD,
      bookID: bookData.title,
      date: new Date(),
      userID: this.userService.getCurrentUserID(),
      operationType: 'order',
      movedTo: 'w chuj'
    };
    this.httpClient.post<any>(this.database.databaseURL + '/operations/', JSON.stringify(newOperation), this.database.httpOptions)
      .subscribe();
  }
}
