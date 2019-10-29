import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-go-back-button',
  templateUrl: './go-back-button.component.html',
  styleUrls: ['./go-back-button.component.scss']
})
export class GoBackButtonComponent implements OnInit {
  constructor(private location: Location) { }

  ngOnInit() {
  }

  onGoBack(event): void {
    this.location.back();
  }
}
