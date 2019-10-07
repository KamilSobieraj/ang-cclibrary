import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-book-tags-detail',
  templateUrl: './book-tags-detail.component.html',
  styleUrls: ['./book-tags-detail.component.scss']
})
export class BookTagsDetailComponent implements OnInit {
@Input() tags: string[];
  constructor() { }

  ngOnInit() {
  }

}
