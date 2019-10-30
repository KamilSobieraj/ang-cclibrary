import { Injectable } from '@angular/core';
// tslint:disable-next-line:no-implicit-dependencies
import groupBy from 'lodash.groupBy';
import {BooksService} from '../books.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  tagsSet$ = new Subject();
  constructor(private booksService: BooksService) { }

  getBooksSortedByTags() {
    const tags = [];
    this.booksService.getBooksDataFromDB().subscribe(allBooks => {
      allBooks.map(book => book.tags.map(tag => tags.push({tagName: tag, ...book})));
      this.tagsSet$.next(groupBy(tags, 'tagName'));
    });
    return this.tagsSet$.asObservable();
  }
}
