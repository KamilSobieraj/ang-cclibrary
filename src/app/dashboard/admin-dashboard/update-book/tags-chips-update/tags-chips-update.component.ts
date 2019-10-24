import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
// tslint:disable-next-line:no-submodule-imports
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {AddNewBookService} from '../../add-new-book/add-new-book.service';
import {map, startWith, takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {UpdateBookService} from '../update-book.service';

@Component({
  selector: 'app-tags-chips-update',
  templateUrl: './tags-chips-update.component.html',
  styleUrls: ['./tags-chips-update.component.scss']
})
export class TagsChipsUpdateComponent implements OnInit, OnDestroy {
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(private updateBookService: UpdateBookService) {
    this.updateBookService.getFormTags().subscribe(oldTags => this.tags = oldTags);
  }

  ngOnInit() {
    this.updateBookService.getFormTags().subscribe(oldTags => this.tags = oldTags);
  }

  add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
      // Add our tag
      if ((value || '').trim()) {
        this.updateBookService.setFormTags(value.trim());
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
