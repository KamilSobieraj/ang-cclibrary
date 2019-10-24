import { Injectable } from '@angular/core';
import {BooksService} from '../../../library/books.service';
import {Observable, Subject, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DatabaseService} from '../../../core/database.service';
import {catchError, retry} from 'rxjs/operators';
import {Router} from '@angular/router';
import {BookModel} from '../../../library/book.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateBookService {
  private formTags$ = new Subject<string[]>();
  tags: string[] = [];
  pickedBookData;

  constructor(private booksService: BooksService,
              private httpClient: HttpClient,
              private databaseService: DatabaseService,
              private router: Router) { }

  async setInitialBookDataForForm(bookID: string) {
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

  getInitialBookDataForForm() {
    return this.pickedBookData;
  }

  updateBookData(bookData: BookModel) {
    this.httpClient
      .patch<any>(
        this.databaseService.databaseURL + '/books/' + bookData.id,
        JSON.stringify(bookData),
        this.databaseService.httpOptions
      )
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
      .subscribe();
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(`Something went wrong: ${errorMessage}`);
    return throwError(errorMessage);
  }

  getFormTags(): Observable<string[]> {
    this.formTags$.next(this.pickedBookData.tags);
    return this.formTags$.asObservable();
  }

  setFormTags(newTag) {
    this.tags.push(newTag);
    this.formTags$.next(this.tags);
  }
}
