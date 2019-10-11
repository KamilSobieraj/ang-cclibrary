import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {OperationsService} from '../../../order-panel/operations.service';
import {Operation} from '../../../order-panel/operation.model';
import {UserService} from '../../user.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-operations-history',
  templateUrl: './operations-history.component.html',
  styleUrls: ['./operations-history.component.scss']
})
export class OperationsHistoryComponent implements OnInit, OnDestroy {
  currentUserHistory: Operation[];
  currentBorrowedBooks: {}[];
  constructor(private operationsService: OperationsService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUserOperations()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(currentUserHistory => this.currentUserHistory = currentUserHistory);
    this.userService.getCurrentUserCurrentBorrowedBooks()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(currentBorrowedBooks => this.currentBorrowedBooks = currentBorrowedBooks);
  }
  onReturnBook(bookID: string) {
    this.userService.removeBookFromBorrowed(bookID);
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
