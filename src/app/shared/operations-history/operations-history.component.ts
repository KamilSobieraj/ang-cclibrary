import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-operations-history',
  templateUrl: './operations-history.component.html',
  styleUrls: ['./operations-history.component.scss']
})
export class OperationsHistoryComponent implements OnInit {
  @Input() operationsHistoryTableDataSource: MatTableDataSource<any>;
  @Input() displayedColumns: string[];

  constructor() { }

  ngOnInit() {
  }

}
