import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { BookTable } from './book-table';
import { BooksService } from '../books.service';
import { UserService } from '../../dashboard/user.service';
import { User } from '../../dashboard/user.model';
import {BookModel} from '../book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksListService {
  booksListTableSet$ = new Subject<BookTable[]>();
  booksListTableDataSource$ = new Subject<MatTableDataSource<BookTable>>();
  currentUserData: User;

  constructor(
    private booksService: BooksService,
    private userService: UserService
  ) {
    this.userService.currentUserData$.subscribe(
      (currentUserData: User) => (this.currentUserData = currentUserData)
    );
  }

  setBooksTableDataSource(): void {
    this.setBooksSetForTable();
    this.booksListTableSet$.subscribe(booksTableSet => {
      this.booksListTableDataSource$.next(
        new MatTableDataSource(booksTableSet)
      );
    });
  }

  setBooksSetForTable(): void {
    this.booksService.getBooksDataFromDB().subscribe((booksData: BookModel[]) => {
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
      this.booksListTableSet$.next(bookSet);
    });
  }
}
