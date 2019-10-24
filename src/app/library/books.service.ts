import { Injectable } from '@angular/core';
import {DatabaseService} from '../core/database.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {BookModel} from './book.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  allBooksData: BookModel[];
  chosenBookID$ = new BehaviorSubject<string>('');
  chosenBookID: string;
  isBookAvailable$ = new BehaviorSubject(false);

  constructor(private databaseService: DatabaseService,
              private httpClient: HttpClient) {
    this.getBooksDataFromDB().subscribe((booksData: BookModel[]) => this.allBooksData = booksData);
    this.chosenBookID$.subscribe((chosenBookID: string) => this.chosenBookID = chosenBookID);
  }

  getBooksDataFromDB(): Observable<BookModel[]> {
    console.log('getBooksDataFromDB');
    return this.databaseService.getData('books');
  }
  updateAllBooksData() {
    this.getBooksDataFromDB().subscribe((booksData: BookModel[]) => this.allBooksData = booksData);
  }

  getBookDetails(id: string = this.chosenBookID): BookModel {
    this.updateAllBooksData();
    return this.allBooksData.find(book => book.id === id);
  }

  sendUpdatedBookDataToDB(newBookData: BookModel, bookID: string): void {
    this.httpClient
      .put(this.databaseService.databaseURL + '/books/' + bookID, JSON.stringify(newBookData), this.databaseService.httpOptions)
      .subscribe();
  }
}
