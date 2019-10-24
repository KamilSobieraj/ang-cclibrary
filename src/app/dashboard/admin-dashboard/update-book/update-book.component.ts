import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookModel} from '../../../library/book.model';
import {UpdateBookService} from './update-book.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {Router} from '@angular/router';
import {BooksService} from '../../../library/books.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit, OnDestroy {
  book: BookModel;

  constructor(private updateBookService: UpdateBookService,
              private router: Router,
              private booksService: BooksService) {
    this.book = this.updateBookService.getInitialBookDataForForm();
  }

  ngOnInit() {
    this.booksService.updateAllBooksData();
    this.book = this.updateBookService.getInitialBookDataForForm();
  }

  onSubmitForm() {
    this.updateBookService.updateBookData(this.book);
    alert('Book data updated!');
    setTimeout(() => this.router.navigate(['/library']),500);

  }
  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
