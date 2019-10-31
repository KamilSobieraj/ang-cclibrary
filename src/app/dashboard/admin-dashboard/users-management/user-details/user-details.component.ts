import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {ActivatedRoute, Params} from '@angular/router';
import {UsersManagementService} from '../users-management.service';
import {MatTableDataSource} from '@angular/material';
import {CurrentBorrowedBookDetails} from '../../../../shared/user-current-borrowed-books/currentBorrowedBookDetails.model';
import {UserTable} from '../users-table.model';
import {UserService} from '../../../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  userID: string;
  userEmail: string;
  operationsHistoryTableDataSource: MatTableDataSource<UserTable>;
  borrowedBooksTableDataSource: MatTableDataSource<CurrentBorrowedBookDetails>;
  operationsColumns = ['title', 'operationType', 'date'];
  borrowedBooksColumns = ['title', 'date', 'returnBookAction'];

  constructor(private activatedRoute: ActivatedRoute,
              private usersManagementService: UsersManagementService,
              private userService: UserService) { }

  ngOnInit() {
    this.setChosenUserID();

    this.usersManagementService.getChosenUserOperationsDetails(this.userID)
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((chosenUserOperationsData: UserTable[]) =>
      this.operationsHistoryTableDataSource = new MatTableDataSource(chosenUserOperationsData));

    this.usersManagementService.getChosenUserBorrowedBooksDetails(this.userID)
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((chosenUserBorrowedBooks: CurrentBorrowedBookDetails[]) => {
      this.borrowedBooksTableDataSource  = new MatTableDataSource(chosenUserBorrowedBooks);
    });

    this.usersManagementService.getChosenUserBorrowedBooksDetails(this.userID);

    this.userEmail = this.userService.getUserDataByID(this.userID)[0].email;

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
