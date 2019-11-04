import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {ModalService} from '../../../shared/modal/modal.service';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
  @Input()  userLoginEmail: string;
  @Input()  userLoginPassword: string;
  constructor(private authService: AuthService,
              private modalService: ModalService) { }

  ngOnInit() {
  }

  onAddNewUser($event): void {
    this.authService.addNewUser($event.userEmail, $event.userPassword, $event.userType);
    // TODO: Must do it much better...
    this.modalService.onOpenDialog('Nowy użytkownik został dodany');
    setTimeout(() => window.location.reload(), 1000);

  }
}
