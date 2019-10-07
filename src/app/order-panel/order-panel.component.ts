import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from './order.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-order-panel',
  templateUrl: './order-panel.component.html',
  styleUrls: ['./order-panel.component.scss']
})
export class OrderPanelComponent implements OnInit, OnDestroy {
  isBookAvailable: boolean;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.isBookAvailable$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(isAvailable => this.isBookAvailable = isAvailable);
  }

  ngOnDestroy(): void {
  }
}
