import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookModel} from '../../library/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  @Input() formHeader: string;
  @Input() submitButtonTitle: string;
  @Output() submitted = new EventEmitter();
  @Input() book: BookModel;
  @Input() tags;
  @Input() bookFormAction: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted.emit();
  }
}
