import {Component, OnDestroy, OnInit} from '@angular/core';
import {BooksService} from '../books.service';
import {MatTableDataSource} from '@angular/material/table';
import {BooksListService} from './books-list.service';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {
  displayedColumns = ['title', 'author', 'currentLocation', 'isAvailable'];
  booksTableDataSource: MatTableDataSource<any>;

  constructor(private booksService: BooksService, private booksListService: BooksListService) { }

  ngOnInit() {
    this.booksListService.setBooksSetForTable();
    this.booksListService.setBooksTableDataSource();
    this.booksListService.booksTableDataSource$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(booksTableDataSource => this.booksTableDataSource = booksTableDataSource);
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
