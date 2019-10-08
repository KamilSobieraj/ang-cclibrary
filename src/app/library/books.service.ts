import { Injectable } from '@angular/core';
import {DatabaseService} from '../core/database.service';
import {Observable, Subject} from 'rxjs';
import {BookModel} from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  booksData: BookModel[];

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
