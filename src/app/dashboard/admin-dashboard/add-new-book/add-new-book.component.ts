import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookModel } from '../../../library/book.model';
import * as uuid from 'uuid';
import { AddNewBookService } from './add-new-book.service';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import {ModalService} from '../../../shared/modal/modal.service';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.scss']
})
export class AddNewBookComponent implements OnInit, OnDestroy {
  book: BookModel;
  tags: string[];

  constructor(private addNewBookService: AddNewBookService,
              private modalService: ModalService) {
    this.clearForm();
  }

  ngOnInit() {
    this.addNewBookService.getFormTags()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((tags: string[]) => {
        this.book.tags = tags;
        this.tags = tags;
      });
  }

  onSubmitForm(): void {
    this.book.id = uuid.v4();
    this.addNewBookService.addNewBook(this.book);
    this.modalService.onOpenDialog('Dodano nową książkę!');
    this.clearForm();
  }

  clearForm(): void {
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

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
