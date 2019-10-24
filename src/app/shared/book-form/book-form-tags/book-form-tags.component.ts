import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
// tslint:disable-next-line:no-submodule-imports
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatChipInputEvent} from '@angular/material';
import {UpdateBookService} from '../../../dashboard/admin-dashboard/update-book/update-book.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {AddNewBookService} from '../../../dashboard/admin-dashboard/add-new-book/add-new-book.service';

@Component({
  selector: 'app-book-form-tags',
  templateUrl: './book-form-tags.component.html',
  styleUrls: ['./book-form-tags.component.scss']
})
export class BookFormTagsComponent implements OnInit,  OnDestroy {
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  @Input() bookFormAction: string;

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(private addNewBookService: AddNewBookService,
              private updateBookService: UpdateBookService) {
  }

  ngOnInit() {
    // TODO: fix tags display on update action
    if (this.bookFormAction === 'addNew') {
    this.addNewBookService.getFormTags()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(tags => (this.tags = tags));
    } else if (this.bookFormAction === 'update') {
      this.updateBookService.getFormTags().subscribe(oldTags => this.tags = oldTags);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our tag
    if ((value || '').trim()) {
      if (this.bookFormAction === 'addNew') {
      this.addNewBookService.setFormTags(value.trim());
      } else if (this.bookFormAction === 'update') {
        this.updateBookService.setFormTags(value.trim());
      }
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }

}
