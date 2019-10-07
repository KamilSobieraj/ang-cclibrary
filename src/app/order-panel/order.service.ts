import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  isBookAvailable$ = new BehaviorSubject(false);
  constructor() { }
}
