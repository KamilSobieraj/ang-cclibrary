import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {User} from '../../user.model';
import {DatabaseService} from '../../../core/database.service';
import {UserTable} from './users-table.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersData$ = new Subject<User[]>();
  usersData: User[];

  constructor(private databaseService: DatabaseService) { }

  getUsersBasicData(): Observable<User[]> {
    this.databaseService.getData('users').subscribe(allUsersData => {
      this.usersData = allUsersData;
      this.usersData$.next(allUsersData);
    });
    return this.usersData$.asObservable();
  }

  removeUser(userID: string) {
    this.databaseService.deleteData('users', userID).subscribe(res => {
      this.getUsersBasicData().subscribe();
    });
  }
}
