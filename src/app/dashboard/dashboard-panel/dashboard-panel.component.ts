import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {User} from '../user.model';
import {Observable} from 'rxjs';
import {UserService} from '../user.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.scss']
})
export class DashboardPanelComponent implements OnInit {
  currentUserData: User;
  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUserData$.subscribe(res => this.currentUserData = res);
  }
}
