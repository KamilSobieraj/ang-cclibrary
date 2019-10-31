import { Injectable } from '@angular/core';
import {BooksService} from '../../../library/books.service';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DatabaseService} from '../../../core/database.service';
import {catchError, retry} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AddUpdateBook} from './add-update-book.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateBookService {
  private formTags$ = new Subject<string[]>();
  tags: string[] = [];
  pickedBookData: AddUpdateBook;

  constructor(private booksService: BooksService,
              private httpClient: HttpClient,
              private databaseService: DatabaseService,
              private router: Router) { }

  async setInitialBookDataForForm(bookID: string): Promise<void> {
    await this.booksService.getBooksDataFromDB().toPromise().then(allBooksData => {
      const bookData = allBooksData.find(book => book.id === bookID);
      this.pickedBookData = {
        id: bookData.id,
        title: bookData.title,
        author: bookData.author,
        publicationYear: bookData.publicationYear,
        editorName: bookData.editorName,
        tags: bookData.tags,
        remarks: bookData.remarks,
        currentLocation: bookData.currentLocation,
        bookCoverUrl: ''
      };
      this.tags = this.pickedBookData.tags;
      this.formTags$.next(this.pickedBookData.tags);
      this.router.navigate(['dashboard/admin/update-book']);
    });
  }

  getInitialBookDataForForm(): AddUpdateBook {
    return this.pickedBookData;
  }

  updateBookData(bookData: AddUpdateBook): void {
    this.httpClient
      .patch<any>(
        this.databaseService.databaseURL + '/books/' + bookData.id,
        JSON.stringify(bookData),
        this.databaseService.httpOptions
      )
      .pipe(
        retry(1),
        catchError(this.databaseService.httpErrorHandler)
      )
      .subscribe();
  }

  getFormTags(): Observable<string[]> {
    this.formTags$.next(this.pickedBookData.tags);
    return this.formTags$.asObservable();
  }

  setFormTags(newTag): void {
    this.tags.push(newTag);
    this.formTags$.next(this.tags);
  }
}
