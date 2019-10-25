import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {ModalService} from '../shared/modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userIsLoggedIn: boolean;
  constructor(private authService: AuthService,
              private router: Router,
              private modalService: ModalService) {
    this.authService.isUserLoggedIn$.subscribe(userLoginStatus => this.userIsLoggedIn = userLoginStatus);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userIsLoggedIn) {
      this.modalService.onOpenDialog('Zaloguj się, aby wykonać tę operację!');
      this.router.navigate(['/login']);
    }
    return true;
  }

}
