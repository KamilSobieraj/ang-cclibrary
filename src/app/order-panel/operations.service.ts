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

  addNewOperation(operationType: string) {
    const operationID = `${operationType}-${uuid.v4()}`;
    const bookData = this.booksService.getBookDetails();
    bookData.history.push(operationID);
    this.userService.addNewOperationToCurrentUser(operationID, bookData.id);
    const newOperation = {
      id: operationID,
      bookID: bookData.title,
      date: new Date(),
      userID: this.userService.getCurrentUserID(),
      operationType,
      movedTo: 'w chuj'
    };
    this.httpClient.post<any>(this.database.databaseURL + '/operations/', JSON.stringify(newOperation), this.database.httpOptions)
      .subscribe();
  }
}
