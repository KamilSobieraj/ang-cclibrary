import {Component, OnDestroy, OnInit} from '@angular/core';
import {OperationsService} from '../../../order-panel/operations.service';
import {Operation} from '../../../order-panel/operation.model';
import {UserService} from '../../user.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
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
  operationsHistoryTableDataSource: MatTableDataSource<any>;
  displayedColumns = ['title', 'operationType', 'date'];
  borrowed;

  constructor(private operationsService: OperationsService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUserOperationsIDS()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(currentUserHistoryOperationsIDS => this.currentUserHistoryOperationsIDS = currentUserHistoryOperationsIDS);
    this.userService.getCurrentUserCurrentBorrowedBooks()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(currentBorrowedBooks => {
        this.currentBorrowedBooks = currentBorrowedBooks;
        // console.log(currentBorrowedBooks);
      });
    this.operationsService.getOperationsData()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(operationsData => this.allOperations = operationsData);
    this.operationsService.operationsHistoryDataForTable$.pipe(takeUntil(componentDestroyed(this)))
      .subscribe(operationsHistory => this.operationsHistoryTableDataSource = new MatTableDataSource(operationsHistory));
    this.operationsService.setOperationsHistoryData();
    this.operationsService.getCurrentUserBorrowedBooksDetails();
    this.userService.abojawiem$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(res => {
        this.borrowed = res;
        // console.log(res);
      });
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
