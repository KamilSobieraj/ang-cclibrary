import {Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../dashboard/auth.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-reset-user-password',
  templateUrl: './reset-user-password.component.html',
  styleUrls: ['./reset-user-password.component.scss']
})
export class ResetUserPasswordComponent implements OnInit, OnDestroy {
  resetPasswordForm: FormGroup;
  isPasswordHidden = true;
  userNewPassword: string;
  userID;

  @Output() submitForm = new EventEmitter<{}>();

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      userNewPassword: ''
    });
    this.setChosenUserID();
  }

  get userNewPasswordInput(): string {
    return this.resetPasswordForm.get('userNewPassword').value;
  }

  getResetPasswordErrorMessage() {
    return this.resetPasswordForm.hasError('required') ? 'You must enter a value' : '';
  }

  @HostListener('document:keydown.enter', ['$event']) onResetUserPassword(): void {
    let userID;
    // * if admin want to change users password, gets userID from setChosenUserID()
    // * if current logged user want to change id, user ID is taken from authService
    this.userID === undefined ? userID = this.authService.getCurrentUserID() : userID = this.userID;
    this.authService.resetUserPassword(userID , this.userNewPasswordInput);
  }

  setChosenUserID(): void {
    this.activatedRoute.params
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((params: Params) => {
        this.userID = params.userID;
      });
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
