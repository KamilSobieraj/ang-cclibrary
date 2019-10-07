import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  @Input()  userLoginEmail: string;
  @Input()  userLoginPassword: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onAddNewUser($event): void {
    this.authService.addNewUser($event.userEmail, $event.userPassword);
  }
}
