import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { BooksService } from '../library/books.service';

@Component({
  selector: 'app-order-panel',
  templateUrl: './order-panel.component.html',
  styleUrls: ['./order-panel.component.scss']
})
export class OrderPanelComponent implements OnInit, OnDestroy {
  isBookAvailable: boolean;
  bookID: string;

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.booksService.isBookAvailable$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((isAvailable: boolean) => (this.isBookAvailable = isAvailable));

    this.booksService.chosenBookID$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((bookID: string) => (this.bookID = bookID));
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
