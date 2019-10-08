import { Injectable } from '@angular/core';
import {DatabaseService} from '../core/database.service';
import {Observable, Subject} from 'rxjs';
import {Book} from './book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  booksData: Book[];

  constructor(private databaseService: DatabaseService) {
    this.getBooksData().subscribe(booksData => this.booksData = booksData);
  }

  getBooksData(): Observable<any> {
    return this.databaseService.getData('books');
  }

  getBookDetail(id: string) {
    return this.booksData.find(book => book.id === id);
  }
}
