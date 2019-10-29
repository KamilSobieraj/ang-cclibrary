import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {CurrentBorrowedBookDetails} from '../../dashboard/currentBorrowedBookDetails.model';
import {UserService} from '../../dashboard/user.service';
import {OperationsService} from '../../order-panel/operations.service';

@Component({
  selector: 'app-user-current-borrowed-books',
  templateUrl: './user-current-borrowed-books.component.html',
  styleUrls: ['./user-current-borrowed-books.component.scss']
})
export class UserCurrentBorrowedBooksComponent implements OnInit {
  @Input() borrowedBooksTableDataSource: MatTableDataSource<CurrentBorrowedBookDetails>;
  @Input() displayedColumns = ['title', 'date', 'returnBookAction'];
  constructor(private userService: UserService,
              private operationsService: OperationsService) { }

  ngOnInit() {
  }
onReturnBook(bookID: string) {
  this.userService.removeBookFromBorrowed(bookID);
  this.operationsService.onBookAction('return', bookID);
  this.operationsService.setOperationsHistoryData();
}

}
