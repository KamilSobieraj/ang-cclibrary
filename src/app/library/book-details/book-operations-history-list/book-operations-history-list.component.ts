import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { OperationsService } from '../../../order-panel/operations.service';
import { BookHistoryService } from './book-history.service';
import { BookHistory } from './book-history.model';

@Component({
  selector: 'app-book-operations-history-list',
  templateUrl: './book-operations-history-list.component.html',
  styleUrls: ['./book-operations-history-list.component.scss']
})
export class BookOperationsHistoryListComponent implements OnInit, OnDestroy {
  bookHistoryTableDataSource: MatTableDataSource<BookHistory>;
  displayedColumns = ['userEmail', 'operationType', 'date'];

  constructor(
    private operationsService: OperationsService,
    private bookHistoryService: BookHistoryService
  ) {}

  ngOnInit() {
    this.operationsService.getOperationsData()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe();
    this.bookHistoryTableDataSource = new MatTableDataSource<BookHistory>(
      this.bookHistoryService.setBookHistoryData()
    );
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}