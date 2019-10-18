import { Injectable } from '@angular/core';
import {DatabaseService} from '../../../core/database.service';
import {HttpClient} from '@angular/common/http';
import {BooksService} from '../../books.service';

@Injectable({
  providedIn: 'root'
})
export class BookHistoryService {

  constructor(private databaseService: DatabaseService,
              private httpClient: HttpClient,
              private booksService: BooksService) { }

  addNewOperationToBookHistory(bookID: string, operationID: string) {
    const bookDetailsData = this.booksService.getBookDetails(bookID);
    bookDetailsData.history.push(operationID);
    this.booksService.sendUpdatedBookDataToDB(bookDetailsData, bookID);
  }

}
