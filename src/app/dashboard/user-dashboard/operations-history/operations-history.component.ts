import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {OperationsService} from '../../../order-panel/operations.service';
import {Operation} from '../../../order-panel/operation.model';
import {UserService} from '../../user.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {BooksService} from '../../../library/books.service';
import {BookModel} from '../../../library/book.model';
import {User} from '../../user.model';
import {HttpClient} from '@angular/common/http';
import {DatabaseService} from '../../../core/database.service';
import {BehaviorSubject} from 'rxjs';
import {OperationsHistoryTable} from './operations-history-table.model';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-operations-history',
  templateUrl: './operations-history.component.html',
  styleUrls: ['./operations-history.component.scss']
})
export class OperationsHistoryComponent implements OnInit, OnDestroy {
  currentUserHistoryOperationsIDS: Operation[];
  allOperations;
  currentBorrowedBooks: {}[];
  table;
  operationsHistoryTable: OperationsHistoryTable[];
  currentUserOperationsData$ = new BehaviorSubject<Operation[]>(null);

  constructor(private operationsService: OperationsService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUserOperationsIDS()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(currentUserHistoryOperationsIDS => this.currentUserHistoryOperationsIDS = currentUserHistoryOperationsIDS);
    this.userService.getCurrentUserCurrentBorrowedBooks()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(currentBorrowedBooks => this.currentBorrowedBooks = currentBorrowedBooks);
    this.operationsService.getOperationsData()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(operationsData => this.allOperations = operationsData);
    this.operationsService.operationsHistoryDataForTable$.subscribe(res => this.table = res);
    this.operationsService.setOperationsHistoryData();
  }

  onReturnBook(bookID: string) {
    this.userService.removeBookFromBorrowed(bookID);
    this.operationsService.addNewOperation('return', bookID);
    this.operationsService.setOperationsHistoryData();
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
