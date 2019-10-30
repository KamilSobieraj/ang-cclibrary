import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {ActivatedRoute, Params} from '@angular/router';
import {UsersService} from '../users.service';
import {MatTableDataSource} from '@angular/material';
import {CurrentBorrowedBookDetails} from '../../../../shared/user-current-borrowed-books/currentBorrowedBookDetails.model';
import {UserTable} from '../users-table.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  userID: string;
  operationsHistoryTableDataSource: MatTableDataSource<UserTable>;
  borrowedBooksTableDataSource: MatTableDataSource<CurrentBorrowedBookDetails>;
  operationsColumns = ['title', 'operationType', 'date'];
  borrowedBooksColumns = ['title', 'date', 'returnBookAction'];

  constructor(private activatedRoute: ActivatedRoute,
              private usersService: UsersService) { }

  ngOnInit() {
    this.setChosenUserID();

    this.usersService.getChosenUserOperationsDetails(this.userID)
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(chosenUserOperationsData =>
      this.operationsHistoryTableDataSource = new MatTableDataSource(chosenUserOperationsData));

    this.usersService.getChosenUserBorrowedBooksDetails(this.userID)
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(chosenUserBorrowedBooks => {
      this.borrowedBooksTableDataSource  = new MatTableDataSource(chosenUserBorrowedBooks);
    });

    this.usersService.getChosenUserBorrowedBooksDetails(this.userID);
  }

  setChosenUserID(): void {
    this.activatedRoute.params
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((params: Params) => {
        this.userID = params.userID;
      });
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
