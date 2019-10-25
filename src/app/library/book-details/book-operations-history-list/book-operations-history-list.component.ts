import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
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
export class BookOperationsHistoryListComponent implements OnInit, OnDestroy, AfterViewInit {
  bookHistoryTableDataSource: MatTableDataSource<BookHistory>;
  displayedColumns = ['userEmail', 'operationType', 'date'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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

  ngAfterViewInit(): void {
    this.bookHistoryTableDataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
