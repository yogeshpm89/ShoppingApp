import { Customer } from './../models/customer';
import { TokenService } from './../services/token.service';
import { ServiceError } from './../models/service-error';
import { MESSAGES } from './../constants/app-constant';
import { ToastMessage, MessageType } from './../models/message';
import { Helper } from './../utilities/helper';
import { DialogService } from './../services/dialog.service';
import { AppService } from './../services/app.service';
import { Component, OnInit } from '@angular/core';
import { ToastMessageService } from '../services/toast-message.service';
import { TokenServiceService } from '../services/token-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  error = {
    email: false,
    password: false,
    password1: false
  }
  constructor(
    private appService: AppService,
    private messageService: ToastMessageService,
    private dialogService: DialogService,
    private tokenService: TokenService
  ) { }


  ngOnInit() {
  }

  onLogin() {
    if (this.validate()) {
      this.appService.loginCustomer(this.email, this.password).subscribe(
        response => {
          this.tokenService.setToken(response['accessToken']);
          this.tokenService.setExpiresIn(response['expires_in']);
          this.tokenService.setUser(response['user'] as Customer);
          this.messageService.show(new ToastMessage(MessageType.SUCCESS, MESSAGES.SUCCESS.LOGIN));
          this.dialogService.hide();
        },
        error => {
          this.messageService.show(new ToastMessage(MessageType.ERROR,  MESSAGES.ERROR.LOGIN));
        }
      )
    }
  }


  validate() {
    let flag = true;
    if (!this.email || !Helper.validateEmail(this.email)) {
      this.error.email = true;
      flag = false;
      const msg = new ToastMessage(MessageType.ERROR, MESSAGES.EMPTY_EMAIL);
      this.messageService.show(msg);
    } else {
      this.error.email = false;
    }

    if (!this.password) {
      this.error.password = true;
      flag = false;
      const msg = new ToastMessage(MessageType.ERROR, MESSAGES.EMPTY_PASSWORD);
      this.messageService.show(msg);
    } else {
      this.error.password = false;
    }
    return flag;
  }

}
