import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {User} from '../../user.model';
import {DatabaseService} from '../../../core/database.service';
import {UserTable} from './users-table.model';
import {OperationsService} from '../../../order-panel/operations.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersData$ = new Subject<User[]>();
  usersData: User[];
  chosenUserDetails$ = new Subject<UserTable[]>();

  constructor(private databaseService: DatabaseService,
              private operationsService: OperationsService) { }

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

  getChosenUserDetails(userID: string) {
    const userDetails = [];
    this.databaseService.getItemData('users', userID).subscribe((userData: User) => {
      userData.history.map(operationID => {
        console.log(this.operationsService.getOperationData(operationID));


      });
    })
  }
}
