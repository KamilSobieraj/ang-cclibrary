import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
  }

  getCurrentUserData(): Observable<User> {
    return this.httpClient.get<User>(this.authService.databaseURL + '/users/' + this.getCurrentUserID());
  }

  getCurrentUserID() {
    return JSON.parse(localStorage.getItem('userData')).sub;
  }
}
