import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-book-availability-detail',
  templateUrl: './book-availability-detail.component.html',
  styleUrls: ['./book-availability-detail.component.scss']
})
export class BookAvailabilityDetailComponent implements OnInit {
@Input() isAvailable: boolean;
  constructor() { }

  ngOnInit() {
  }

}
