import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../../../order-panel/order.service';

@Component({
  selector: 'app-book-availability-detail',
  templateUrl: './book-availability-detail.component.html',
  styleUrls: ['./book-availability-detail.component.scss']
})
export class BookAvailabilityDetailComponent implements OnInit {
@Input() isAvailable: boolean;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.isBookAvailable$.next(this.isAvailable);
  }

}
