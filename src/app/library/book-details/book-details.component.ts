import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {Book} from '../book';
import {BooksService} from '../books.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  bookDetails: Book;

  constructor(private activatedRoute: ActivatedRoute,
              private booksService: BooksService,
              private location: Location) { }

  ngOnInit() {
    this.getBookDetails();
  }

  getBookDetails() {
    this.activatedRoute.params
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((params: Params) => {
        this.bookDetails = this.booksService.getBookDetail(params['id']);
        console.log(this.bookDetails);
      });
  }

  onGoBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
