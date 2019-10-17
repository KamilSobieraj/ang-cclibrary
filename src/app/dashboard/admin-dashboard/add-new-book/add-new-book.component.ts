import { Component, OnInit } from '@angular/core';
import {BookModel} from '../../../library/book.model';
import * as uuid from 'uuid';
import {AddNewBookService} from './add-new-book.service';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.scss']
})
export class AddNewBookComponent implements OnInit {
  book: BookModel;
  constructor(private addNewBookService: AddNewBookService) {
    this.book = {
      id: '',
      title: '',
      author: '',
      publicationYear: '',
      editorName: '',
      tags: [],
      remarks: '',
      currentLocation: '',
      isAvailable: true,
      history: [],
      reservations: [],
      bookCoverUrl: ''
    };
  }

  ngOnInit() {
  }

  onSubmitForm() {
    this.book.id = uuid.v4();
    this.addNewBookService.addNewBook(this.book);
    alert('New book added!');
    this.book = {
      id: '',
      title: '',
      author: '',
      publicationYear: '',
      editorName: '',
      tags: [],
      remarks: '',
      currentLocation: '',
      isAvailable: true,
      history: [],
      reservations: [],
      bookCoverUrl: ''
    };
  }
}
