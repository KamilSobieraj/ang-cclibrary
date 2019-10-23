import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
  @Input()  userLoginEmail: string;
  @Input()  userLoginPassword: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onAddNewUser($event): void {
    this.authService.addNewUser($event.userEmail, $event.userPassword, $event.userType);
    window.location.reload();
  }
}
