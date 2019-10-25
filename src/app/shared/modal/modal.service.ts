import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ModalComponent} from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public matDialog: MatDialog) { }

  onOpenDialog(content: string): void {
    this.matDialog.open(ModalComponent, {
      position: {top: '100px'},
      maxWidth: '80%',
      data: content
    });
  }
}
