import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {ActivatedRoute, Params} from '@angular/router';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  userID: string;
  constructor(private activatedRoute: ActivatedRoute,
              private usersService: UsersService) { }

  ngOnInit() {
    this.getUserDetails()
  }

  getUserDetails(): void {
    this.activatedRoute.params
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((params: Params) => {
        this.userID = params.userID;
        this.usersService.getChosenUserDetails(params.userID);
      });
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
