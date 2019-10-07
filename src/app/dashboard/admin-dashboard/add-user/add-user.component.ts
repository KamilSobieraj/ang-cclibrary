import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userLoginEmail: string;
  userLoginPassword: string;
  isPasswordHidden = true;
  loginEmail = new FormControl('', [Validators.required, Validators.email]);

  constructor() { }

  ngOnInit() {
  }

}
