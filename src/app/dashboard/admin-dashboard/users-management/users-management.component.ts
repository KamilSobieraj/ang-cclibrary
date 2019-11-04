import { Component, OnInit } from '@angular/core';
import {MatIconRegistry, MatTableDataSource} from '@angular/material';
import {User} from '../../user.model';
import {DomSanitizer} from '@angular/platform-browser';
import {UsersManagementService} from './users-management.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  displayedColumns = ['userEmail', 'currentlyBorrowedBooksQuantity', 'removeUser', 'userDetails'];
  usersTableDataSource: MatTableDataSource<User>;

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private usersManagementService: UsersManagementService) {
    this.matIconRegistry.addSvgIcon('book-unavailable',this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/cross.svg')
    );
  }

  ngOnInit() {
    this.usersManagementService.getUsersBasicData().subscribe((usersData: User[]) => {
     this.usersTableDataSource = new MatTableDataSource(usersData);
    });
  }

  onRemoveUser(userID: string) {
    this.usersManagementService.removeUser(userID);
  }
}
