import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {OperationsService} from '../../shared/operations-history/operations.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {CurrentBorrowedBookDetails} from '../../shared/user-current-borrowed-books/currentBorrowedBookDetails.model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  operationsHistoryTableDataSource: MatTableDataSource<any>;
  columnsToDisplay = ['title', 'operationType', 'date'];
  borrowedBooksTableDataSource: MatTableDataSource<CurrentBorrowedBookDetails>;
  displayedColumns = ['title', 'date', 'returnBookAction'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private operationsService: OperationsService,
              private userService: UserService) {}

  ngOnInit() {
    this.operationsService.getOperationsData()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe();

    this.operationsService.operationsHistoryDataForTable$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(
        operationsHistory => {
          this.operationsHistoryTableDataSource = new MatTableDataSource(operationsHistory);
          // TODO: remove error
          this.operationsHistoryTableDataSource.paginator = this.paginator;
        }
      );
    this.operationsService.setOperationsHistoryData();

    this.operationsService.setCurrentUserBorrowedBooksDetails();
    this.userService.currentBorrowedBooksDetails$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((currentBorrowedBooks : CurrentBorrowedBookDetails[]) => {
        this.borrowedBooksTableDataSource = new MatTableDataSource(currentBorrowedBooks);
      });
  }



  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
