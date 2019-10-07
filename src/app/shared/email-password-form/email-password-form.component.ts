import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-email-password-form',
  templateUrl: './email-password-form.component.html',
  styleUrls: ['./email-password-form.component.scss']
})
export class EmailPasswordFormComponent implements OnInit {
  userEmail: string;
  userPassword: string;
  @Output() submitForm = new EventEmitter();
  isPasswordHidden = true;
  @Input() header: string;

  emailPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.emailPasswordForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ''
    });
  }

  onSubmit() {
    this.submitForm.emit({userEmail: this.emailInput, userPassword: this.passwordInput});
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

}
