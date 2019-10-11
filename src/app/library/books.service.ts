import { Injectable } from '@angular/core';
import {DatabaseService} from '../core/database.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookModel} from './book.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  booksData: BookModel[];
  chosenBookID$ = new BehaviorSubject<string>('');
  chosenBookID: string;
  isBookAvailable$ = new BehaviorSubject(false);

  constructor(private databaseService: DatabaseService,
              private httpClient: HttpClient) {
    this.getBooksDataFromDB().subscribe((booksData: BookModel[]) => this.booksData = booksData);
    this.chosenBookID$.subscribe((chosenBookID: string) => this.chosenBookID = chosenBookID);
  }

  getBooksDataFromDB(): Observable<any> {
    return this.databaseService.getData('books');
  }

  getBookDetails(id = this.chosenBookID): BookModel {
    return this.booksData.find(book => book.id === id);
  }

  sendUpdatedBookDataToDB(newBookData: BookModel, bookID: string = this.chosenBookID) {
    this.httpClient
      .put(this.databaseService.databaseURL + '/books/' + bookID, JSON.stringify(newBookData), this.databaseService.httpOptions)
      .subscribe();
  }

  changeBookAvailabilityStatusInDB(changeTo: boolean, bookID: string = this.chosenBookID) {
    const bookData = this.getBookDetails(bookID);
    bookData.isAvailable = changeTo;
    this.sendUpdatedBookDataToDB(bookData, bookID);
  }
}
