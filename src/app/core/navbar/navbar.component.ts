import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../dashboard/auth.service';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { UserService } from '../../dashboard/user.service';
import { User } from '../../dashboard/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isUserLoggedIn: boolean;
  userData;
  currentUserType: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.userLoginStatus()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(isUserLoggedIn => (this.isUserLoggedIn = isUserLoggedIn));
    this.userService.currentUserData$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(currentUserData => (this.userData = currentUserData));
    this.authService.userType$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(
      userType => (this.currentUserType = userType)
    );
  }

  goToLoginPanel(): void {
    this.router.navigate(['login']);
  }

  logoutUser(): void {
    this.authService.logoutUser();
  }

  getCurrentUserEmail(): string {
    return JSON.parse(localStorage.getItem('userData')).email;
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) due to componentDestroyed(this) to work
  }
}
