import {Component, Input, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-book-details-element',
  templateUrl: './book-details-element.component.html',
  styleUrls: ['./book-details-element.component.scss']
})
export class BookDetailsElementComponent implements OnInit {
@Input() header: string;
@Input() content: string;

  constructor() {
  }

  ngOnInit() {
  }

}
