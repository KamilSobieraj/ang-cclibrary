import { Injectable } from '@angular/core';
import { BookModel } from '../../../library/book.model';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../../../core/database.service';
import { catchError, retry } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import {ModalService} from '../../../shared/modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class AddNewBookService {
  private formTags$ = new Subject<string[]>();
  tags: string[] = [];

  constructor(
    private httpClient: HttpClient,
    private databaseService: DatabaseService,
    private modalService: ModalService
  ) {}

  addNewBook(book: BookModel): void {
    this.httpClient
      .post<any>(
        this.databaseService.databaseURL + '/books/',
        JSON.stringify(book),
        this.databaseService.httpOptions
      )
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
      .subscribe();
    this.resetFormTags();
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
    this.modalService.onOpenDialog(`Something went wrong: ${errorMessage}`);
    return throwError(errorMessage);
  }

  getFormTags(): Observable<string[]> {
    return this.formTags$.asObservable();
  }

  setFormTags(newTag) {
    this.tags.push(newTag);
    this.formTags$.next(this.tags);
  }

  resetFormTags() {
    this.formTags$.next([]);
  }
}
