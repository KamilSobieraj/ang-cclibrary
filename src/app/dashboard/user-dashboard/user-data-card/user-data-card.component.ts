import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-user-data-card',
  templateUrl: './user-data-card.component.html',
  styleUrls: ['./user-data-card.component.scss']
})
export class UserDataCardComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
