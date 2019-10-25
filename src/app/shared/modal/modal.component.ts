import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data
              ) { }

  ngOnInit() {
  }

  onClose(): void {
    this.matDialogRef.close();
  }

}
