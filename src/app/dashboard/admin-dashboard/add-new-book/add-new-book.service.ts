import { Injectable } from '@angular/core';
import { BookModel } from '../../../library/book.model';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../../../core/database.service';
import { Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddNewBookService {
  private formTags$ = new Subject<string[]>();
  tags: string[] = [];

  constructor(
    private httpClient: HttpClient,
    private databaseService: DatabaseService
  ) {}

  addNewBook(book: BookModel): void {
    this.databaseService.postData('books', book);
    this.resetFormTags();
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
