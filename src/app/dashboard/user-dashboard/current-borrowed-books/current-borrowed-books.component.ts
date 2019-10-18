import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {OperationsService} from '../../../order-panel/operations.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-current-borrowed-books',
  templateUrl: './current-borrowed-books.component.html',
  styleUrls: ['./current-borrowed-books.component.scss']
})
export class CurrentBorrowedBooksComponent implements OnInit, OnDestroy {
  currentBorrowedBooks: {}[];
  borrowedBooksTableDataSource: MatTableDataSource<any>;
  displayedColumns = ['title', 'date', '...'];

  constructor(private userService: UserService,
              private operationsService: OperationsService) {
    this.userService.getCurrentUserCurrentBorrowedBooks()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(currentBorrowedBooks => {
        this.currentBorrowedBooks = currentBorrowedBooks;
      });

    this.operationsService.getCurrentUserBorrowedBooksDetails();

    this.userService.currentBorrowedBooks2$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(currentBorrowedBooks => {
        this.borrowedBooksTableDataSource = new MatTableDataSource(currentBorrowedBooks);
      });
  }

  ngOnInit() {}

  onReturnBook(bookID: string) {
    this.userService.removeBookFromBorrowed(bookID);
    this.operationsService.onBookAction('return', bookID);
    this.operationsService.setOperationsHistoryData();
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
