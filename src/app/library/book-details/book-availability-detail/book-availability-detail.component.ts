import {Component, Input, OnInit} from '@angular/core';
import {BooksService} from '../../books.service';
import {Router} from '@angular/router';
import {OperationsService} from '../../../order-panel/operations.service';

@Component({
  selector: 'app-book-availability-detail',
  templateUrl: './book-availability-detail.component.html',
  styleUrls: ['./book-availability-detail.component.scss']
})
export class BookAvailabilityDetailComponent implements OnInit {
@Input() isAvailable: boolean;
@Input() bookID: string;

  constructor(private booksService: BooksService,
              private operationService: OperationsService,
              private router: Router) { }

  ngOnInit() {
    this.booksService.isBookAvailable$.next(this.isAvailable);
    this.booksService.chosenBookID$.next(this.bookID);
  }

  onOrderBook() {
    this.booksService.changeBookAvailabilityStatusInDB(false);
    this.operationService.addNewOperation('borrow', this.bookID);
    window.alert('Ksiązka zamówiona - udaj się do miejsca jej lokalizacji i zaczytuj!');
    // TODO: Make it right
    setTimeout(() => this.router.navigate(['/dashboard']), 500);
    // this.router.navigate(['/dashboard']);
  }
}
