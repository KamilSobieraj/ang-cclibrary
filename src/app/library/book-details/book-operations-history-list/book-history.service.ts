import { Injectable } from '@angular/core';
import { DatabaseService } from '../../../core/database.service';
import { HttpClient } from '@angular/common/http';
import { BooksService } from '../../books.service';
import { OperationsService } from '../../../order-panel/operations.service';
import { UserService } from '../../../dashboard/user.service';
import {BookModel} from '../../book.model';
import {BookHistory} from './book-history.model';

@Injectable({
  providedIn: 'root'
})
export class BookHistoryService {

  constructor(
    private databaseService: DatabaseService,
    private httpClient: HttpClient,
    private booksService: BooksService,
    private operationsService: OperationsService,
    private userService: UserService
  ) {
  }

  getBooksData(): BookModel {
    const chosenBookID = this.booksService.chosenBookID$.getValue();
    return this.booksService.getBookDetails(chosenBookID);
  }

  setBookHistoryData(): BookHistory[] {
    const bookHistoryDetails = [];
    // TODO: Fix history error
    const chosenBookHistory = this.getBooksData().history;
    chosenBookHistory.map(operationID => {
      const operationData = this.operationsService.getOperationData(operationID);
      const userEmail = this.userService.getUserDataByID(operationData.userID)[0].email;
      bookHistoryDetails.push({
        userID: operationData.userID,
        userEmail,
        operationType: operationData.operationType,
        operationDate: operationData.date
      });
    });
    return bookHistoryDetails;
  }

}
