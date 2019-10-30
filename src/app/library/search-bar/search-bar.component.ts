import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BooksListService } from '../books-list/books-list.service';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import {BookTable} from '../books-list/book-table';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  booksListTableDataSource: MatTableDataSource<BookTable>;

  constructor(private booksListService: BooksListService) {}

  ngOnInit() {
    this.booksListService.booksListTableDataSource$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(
        booksTableDataSource =>
          (this.booksListTableDataSource = booksTableDataSource)
      );
  }

  // ? Searches tags as well
  searchFilter(filterValue: string): void {
    this.booksListTableDataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
