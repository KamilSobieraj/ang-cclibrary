import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.scss']
})
export class DashboardPanelComponent implements OnInit, OnDestroy {
  currentUserData: User;
  currentUserType: string;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.userType$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(
        userType => this.currentUserType = userType
      );

    this.userService.getCurrentUserData();
    // TODO: make it right!
    setTimeout(() => this.getCurrentUserData(),100);
  }

  getCurrentUserData() {
    this.userService.currentUserData$.subscribe(
      currentUserData => this.currentUserData = currentUserData
    )
  }
  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
