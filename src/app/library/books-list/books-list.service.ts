import { Injectable } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';
import {BookTable} from './book-table';
import {BooksService} from '../books.service';

@Injectable({
  providedIn: 'root'
})
export class BooksListService {
  booksTableSet$ = new Subject<BookTable[]>();
  booksTableDataSource$ = new Subject<MatTableDataSource<any>>();

  constructor(private booksService: BooksService) {
  }

  setBooksSetForTable() {
    this.booksService.getBooksDataFromDB()
      .subscribe(booksData => {
        const bookSet = [];
        booksData.map(book => {
          const bookTableData = {
            id: book.id,
            title: book.title,
            author: book.author,
            tags: book.tags,
            currentLocation: book.currentLocation,
            isAvailable: book.isAvailable
          };
          bookSet.push(bookTableData);
        });
        this.booksTableSet$.next(bookSet);
      });
  }

  setBooksTableDataSource(): void {
    this.booksTableSet$.subscribe(booksTableSet => {
      this.booksTableDataSource$.next(new MatTableDataSource(booksTableSet));
    });
  }
}
