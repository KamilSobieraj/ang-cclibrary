import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {BooksListService} from '../books-list/books-list.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  booksTableDataSource: MatTableDataSource<any>;

  constructor(private booksListService: BooksListService) { }

  ngOnInit() {
    this.booksListService.booksTableDataSource$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(booksTableDataSource => this.booksTableDataSource = booksTableDataSource);
  }

  searchFilter(filterValue: string) {
    this.booksTableDataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
  }
}
