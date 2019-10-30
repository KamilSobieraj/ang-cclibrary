import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
// tslint:disable-next-line:no-submodule-imports
import { MatTableDataSource } from '@angular/material/table';
import { BooksListService } from './books-list.service';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../dashboard/auth.service';
import { DatabaseService } from '../../core/database.service';
import { BookTable } from './book-table';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { UpdateBookService } from '../../dashboard/admin-dashboard/update-book/update-book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {
  displayedColumns = [];
  booksTableDataSource: MatTableDataSource<BookTable>;
  currentUserType: string;

  constructor(
    private booksService: BooksService,
    private booksListService: BooksListService,
    private authService: AuthService,
    private database: DatabaseService,
    private updateBookService: UpdateBookService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.setColumnsSetDueToUserType();

    this.matIconRegistry.addSvgIcon(
      'book-available', this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/available.svg')
    );
    this.matIconRegistry.addSvgIcon('book-unavailable',this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/cross.svg')
    );
  }

  ngOnInit() {
    this.setCurrentUserType();

    this.booksListService.setBooksTableDataSource();

    this.booksListService.booksListTableDataSource$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(
        booksTableDataSource =>
          (this.booksTableDataSource = booksTableDataSource)
      );
  }
  // ! move it to service and use here and in book-details.component
  setCurrentUserType(): void {
    this.authService.userType$
      .pipe(takeUntil(componentDestroyed(this))).subscribe(
      userType => (this.currentUserType = userType)
    );
  }

  setColumnsSetDueToUserType(): void {
    this.authService.userType$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(
        userType => {
          userType === 'admin'
            ? (this.displayedColumns = [
              'title',
              'author',
              'currentLocation',
              'isAvailable',
              'removeBook',
              'updateBook'
            ])
            : (this.displayedColumns = [
              'title',
              'author',
              'currentLocation',
              'isAvailable'
            ]);
        })
  }

  onRemoveBook(bookID: string): void {
    this.database.deleteData('books', bookID).subscribe(res => {
      this.booksListService.setBooksTableDataSource();
    });
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
