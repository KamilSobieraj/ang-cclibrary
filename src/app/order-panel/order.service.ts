import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  isBookAvailable$ = new BehaviorSubject(false);
  chosenBookID$ = new BehaviorSubject<string>('');

  constructor() {
  }
}
