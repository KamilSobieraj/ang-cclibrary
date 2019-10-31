import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../auth.service';
import {ModalService} from '../../shared/modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private modalService: ModalService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.userType$.getValue() === 'admin') {
      return true;
    } else {
      this.modalService.onOpenDialog('Musisz mieć status administratora, żeby mieć dostęp do tego zasobu');
      this.router.navigate(['/library']);
    }
  }
}
