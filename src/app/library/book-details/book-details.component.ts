import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { BookModel } from '../book.model';
import { BooksService } from '../books.service';
import { Location } from '@angular/common';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {UpdateBookService} from '../../dashboard/admin-dashboard/update-book/update-book.service';
import {AuthService} from '../../dashboard/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  bookDetails: BookModel;
  currentUserType: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private location: Location,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private updateBookService: UpdateBookService,
    private authService: AuthService
  ) {
    this.matIconRegistry.addSvgIcon('book-cover', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/book.svg')
    );
  }

  ngOnInit() {
    this.getBookDetails();
    this.setCurrentUserType();
  }

  getBookDetails(): void {
    this.activatedRoute.params
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((params: Params) => {
        this.booksService.getBookDetailsObs(params.id).subscribe(res => this.bookDetails = res);
      });
  }
  // ! to pójdzie z serwisu
  setCurrentUserType(): void {
    this.authService.userType$
      .pipe(takeUntil(componentDestroyed(this))).subscribe(
      userType => (this.currentUserType = userType)
    );
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) due to componentDestroyed(this) to work
  }
}
