import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userIsLoggedIn: boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.isUserLoggedIn$.subscribe(userLoginStatus => this.userIsLoggedIn = userLoginStatus);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userIsLoggedIn) {
      window.alert('Zaloguj się, aby wykonać tę operację!');
      this.router.navigate(['/login']);
    }
    return true;
  }

}
