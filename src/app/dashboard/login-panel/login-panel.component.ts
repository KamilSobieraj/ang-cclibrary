import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss']
})
export class LoginPanelComponent implements OnInit {
  @Input()  userLoginEmail: string;
  @Input()  userLoginPassword: string;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmitLogin($event): void {
    this.authService.loginUser($event.userEmail, $event.userPassword);
  }
}
