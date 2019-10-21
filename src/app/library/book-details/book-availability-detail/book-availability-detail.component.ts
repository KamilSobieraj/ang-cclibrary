import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from '../../books.service';
import { Router } from '@angular/router';
import { OperationsService } from '../../../order-panel/operations.service';
import { AuthService } from '../../../dashboard/auth.service';

@Component({
  selector: 'app-book-availability-detail',
  templateUrl: './book-availability-detail.component.html',
  styleUrls: ['./book-availability-detail.component.scss']
})
export class BookAvailabilityDetailComponent implements OnInit {
  @Input() isAvailable: boolean;
  @Input() bookID: string;
  isUserLoggedIn: boolean;

  constructor(
    private booksService: BooksService,
    private operationService: OperationsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.booksService.isBookAvailable$.next(this.isAvailable);
    this.booksService.chosenBookID$.next(this.bookID);
    this.authService.isUserLoggedIn$.subscribe(
      userLoginStatus => (this.isUserLoggedIn = userLoginStatus)
    );
  }

  onOrderBook() {
    if (!this.isUserLoggedIn) {
      this.router.navigate(['/dashboard']);
    } else {
      this.operationService.onBookAction('borrow', this.bookID);
      window.alert(
        'Ksiązka zamówiona - udaj się do miejsca jej lokalizacji i zaczytuj!'
      );
      // TODO: Make it right
      setTimeout(() => this.router.navigate(['/dashboard']), 500);
    }
  }
}
