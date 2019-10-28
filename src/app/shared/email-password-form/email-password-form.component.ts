import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserForm} from './userForm.model';

@Component({
  selector: 'app-email-password-form',
  templateUrl: './email-password-form.component.html',
  styleUrls: ['./email-password-form.component.scss']
})
export class EmailPasswordFormComponent implements OnInit {
  userEmail: string;
  userPassword: string;
  @Output() submitForm = new EventEmitter<UserForm>();
  isPasswordHidden = true;
  @Input() header: string;
  @Input() buttonTitle: string;
  @Input() addUserType: boolean;

  emailPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.emailPasswordForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: '',
      userType: 'regular'
    });
  }

  @HostListener('document:keydown.enter', ['$event']) onSubmit(): void {
    this.submitForm.emit({userEmail: this.emailInput, userPassword: this.passwordInput, userType: this.userTypeInput});
  }

  getEmailLoginErrorMessage() {
    return this.emailPasswordForm.hasError('required') ? 'You must enter a value' :
      this.emailPasswordForm.hasError('email') ? 'Not a valid email' :
        '';
  }

  get emailInput(): string {
    return this.emailPasswordForm.get('userEmail').value;
  }

  get passwordInput(): string {
    return this.emailPasswordForm.get('userPassword').value;
  }

  get userTypeInput() {
    return this.emailPasswordForm.get('userType').value;
  }

}
