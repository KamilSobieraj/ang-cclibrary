import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../user.model';
import {UserService} from '../../user.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-user-data-card',
  templateUrl: './user-data-card.component.html',
  styleUrls: ['./user-data-card.component.scss']
})
export class UserDataCardComponent implements OnInit, OnDestroy {
  currentUserData: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUserData()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(currendUserData => this.currentUserData = currendUserData);
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
