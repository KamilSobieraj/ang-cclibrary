import {Component, OnDestroy, OnInit} from '@angular/core';
import {BooksService} from '../books.service';
import {MatTableDataSource} from '@angular/material/table';
import {BooksListService} from './books-list.service';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {takeUntil} from 'rxjs/operators';
import {AuthService} from '../../dashboard/auth.service';
import {DatabaseService} from '../../core/database.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {
  displayedColumns = [];
  booksTableDataSource: MatTableDataSource<any>;

  constructor(private booksService: BooksService,
              private booksListService: BooksListService,
              private authService: AuthService,
              private database: DatabaseService) {
    this.setCurrentUserTypeDisplayedColumns();
  }

  ngOnInit() {
    this.booksListService.setBooksSetForTable();
    this.booksListService.setBooksTableDataSource();
    this.booksListService.booksTableDataSource$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(booksTableDataSource => this.booksTableDataSource = booksTableDataSource);
  }

  setCurrentUserTypeDisplayedColumns() {
    this.authService.userType$.getValue() === 'admin' ?
      this.displayedColumns = ['title', 'author', 'currentLocation', 'isAvailable', 'removeBook'] :
      this.displayedColumns = ['title', 'author', 'currentLocation', 'isAvailable'];
  }

  onRemoveBook(bookID: string) {
    this.database.deleteData('books', bookID).subscribe(res => {
      this.booksListService.setBooksSetForTable();
      this.booksListService.setBooksTableDataSource();
    });
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
