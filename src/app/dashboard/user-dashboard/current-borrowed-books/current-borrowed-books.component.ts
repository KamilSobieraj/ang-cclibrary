import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { OperationsService } from '../../../order-panel/operations.service';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { MatTableDataSource } from '@angular/material';
import {CurrentBorrowedBookDetails} from '../../currentBorrowedBookDetails.model';

@Component({
  selector: 'app-current-borrowed-books',
  templateUrl: './current-borrowed-books.component.html',
  styleUrls: ['./current-borrowed-books.component.scss']
})
export class CurrentBorrowedBooksComponent implements OnInit, OnDestroy {
  borrowedBooksTableDataSource: MatTableDataSource<CurrentBorrowedBookDetails>;
  displayedColumns = ['title', 'date', 'returnBookAction'];

  constructor(
    private userService: UserService,
    private operationsService: OperationsService
  ) {
    this.operationsService.setCurrentUserBorrowedBooksDetails();
    this.userService.currentBorrowedBooksDetails$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((currentBorrowedBooks : CurrentBorrowedBookDetails[]) => {
        this.borrowedBooksTableDataSource = new MatTableDataSource(currentBorrowedBooks);
      });
  }

  ngOnInit() {}

  onReturnBook(bookID: string): void {
    this.userService.removeBookFromBorrowed(bookID);
    this.operationsService.onBookAction('return', bookID);
    this.operationsService.setOperationsHistoryData();
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
