import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../order-panel/operations.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  constructor(private operationsService: OperationsService) {}

  ngOnInit() {
    // ? Below line for OperationService init
    this.operationsService.getOperationsDataFromDB().subscribe();
  }
}
