import { Injectable } from '@angular/core';
import {DatabaseService} from '../core/database.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {BookModel} from './book.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  allBooksData: BookModel[];
  chosenBookID$ = new BehaviorSubject<string>('');
  chosenBookID: string;
  isBookAvailable$ = new BehaviorSubject(false);
  chosenBookDetails$ = new Subject<BookModel>();

  constructor(private databaseService: DatabaseService,
              private httpClient: HttpClient) {
    this.getBooksDataFromDB().subscribe((booksData: BookModel[]) => this.allBooksData = booksData);
    this.chosenBookID$.subscribe((chosenBookID: string) => this.chosenBookID = chosenBookID);
  }

  getBooksDataFromDB(): Observable<BookModel[]> {
    return this.databaseService.getData('books');
  }
  updateAllBooksData() {
    this.getBooksDataFromDB().subscribe((booksData: BookModel[]) => this.allBooksData = booksData);
  }

  getBookDetails(id: string = this.chosenBookID): BookModel {
    this.updateAllBooksData();
    return this.allBooksData.find(book => book.id === id);
  }
  async setBookDetails(id: string = this.chosenBookID) {
    await this.getBooksDataFromDB().toPromise().then(allBooks => {
      this.chosenBookDetails$.next(allBooks.find(book => book.id === id));
    })
  }

  getBookDetailsObs(id: string): Observable<BookModel> {
    this.setBookDetails(id);
    return this.chosenBookDetails$.asObservable();
  }

  sendUpdatedBookDataToDB(newBookData: BookModel, bookID: string): void {
    this.httpClient
      .put(this.databaseService.databaseURL + '/books/' + bookID, JSON.stringify(newBookData), this.databaseService.httpOptions)
      .subscribe();
  }
}
