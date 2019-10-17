import { Injectable } from '@angular/core';
import {BookModel} from '../../../library/book.model';
import {HttpClient} from '@angular/common/http';
import {DatabaseService} from '../../../core/database.service';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddNewBookService {

  constructor(private httpClient: HttpClient,
              private databaseService: DatabaseService) { }

  addNewBook(book: BookModel) {
    this.httpClient.post<any>(this.databaseService.databaseURL + '/books/', JSON.stringify(book), this.databaseService.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler))
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
}
