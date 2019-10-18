import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import * as uuid from 'uuid';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {DatabaseService} from '../core/database.service';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn$ = new BehaviorSubject(this.isUserLoginStatusHandler());
  userType$ = new BehaviorSubject<string>(this.getCurrentUserType());

  constructor(private router: Router,
              private httpClient: HttpClient,
              private databaseService: DatabaseService) {
  }

  userLoginStatus(): Observable<boolean> {
    return this.isUserLoggedIn$.asObservable();
  }

  loginUser(email: string, password: string): void {
    const loginData = {
      email,
      password
    };
    this.httpClient.post<any>(this.databaseService.databaseURL + '/login/', JSON.stringify(loginData), this.databaseService.httpOptions)
      .subscribe(
      user => {
        this.isUserLoggedIn$.next(true);
        localStorage.setItem('userData', atob(user.accessToken.split('.')[1]));
        localStorage.setItem('userLoginStatus', 'user is logged in');
        this.setUserType();
        this.router.navigate(['dashboard']);
      }
    );
  }

  setUserType() {
    this.httpClient
      .get<User>(this.databaseService.databaseURL + '/users/' + this.getCurrentUserID())
      .subscribe(res => {
        this.userType$.next(res.userType);
        localStorage.setItem('userType', res.userType);
      }
      );
  }

  getCurrentUserID(): string {
    return JSON.parse(localStorage.getItem('userData')).sub;
  }

  getCurrentUserType(): string {
    return localStorage.getItem('userType');
  }

  logoutUser(): void {
    this.isUserLoggedIn$.next(false);
    this.userType$.next(null);
    localStorage.removeItem('userLoginStatus');
    this.router.navigate(['/library']);
  }

  isUserLoginStatusHandler(): boolean {
    return (localStorage.getItem('userLoginStatus') !== null) ? true : false;
  }

  addNewUser(email: string, password: string, userType: string): void {
    const userData = {
      email,
      password,
      id: uuid.v4(),
      userType,
      history: [],
      currentBorrowedBooks: []
    };
    this.httpClient.post<any>(this.databaseService.databaseURL + '/register/', JSON.stringify(userData), this.databaseService.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      ).subscribe();
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(`Something went wrong: ${errorMessage}`);
    return throwError(errorMessage);
  }
}
