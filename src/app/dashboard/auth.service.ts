import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import * as uuid from 'uuid';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn$ = new BehaviorSubject(this.userLoginStatusHandler());
  databaseURL = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private router: Router,
              private httpClient: HttpClient) {
  }

  userLoginStatus(): Observable<boolean> {
    return this.isUserLoggedIn$.asObservable();
  }

  loginUser(email: string, password: string): void {
    const loginData = {
      email,
      password
    };
    this.httpClient.post<any>(this.databaseURL + '/login/', JSON.stringify(loginData), this.httpOptions).subscribe(
      user => {
        this.isUserLoggedIn$.next(true);
        localStorage.setItem('userData', atob(user.accessToken.split('.')[1]));
        localStorage.setItem('userLoginStatus', 'user is logged in');
        this.router.navigate(['dashboard']);
      }
    );
  }

  logoutUser(): void {
    this.isUserLoggedIn$.next(false);
    localStorage.removeItem('userLoginStatus');
    this.router.navigate(['/library']);
  }

  userLoginStatusHandler(): boolean {
    return (localStorage.getItem('userLoginStatus') !== null) ? true : false;
  }

  addNewUser(email: string, password: string, userType: string): void {
    const userData = {
      email,
      password,
      id: uuid.v4(),
      userType,
      history: []
    };
    this.httpClient.post<any>(this.databaseURL + '/register/', JSON.stringify(userData), this.httpOptions)
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
