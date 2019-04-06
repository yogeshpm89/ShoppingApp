import { DialogConfig, DialogConfigForms } from './../dialog/dialog-config';
import { DialogService } from './../services/dialog.service';
import { ToastMessageService } from './../services/toast-message.service';
import { Component, OnInit } from '@angular/core';
import { Helper } from '../utilities/helper';
import { AppService } from '../services/app.service';
import { ToastMessage, MessageType } from '../models/message';
import { MESSAGES } from '../constants/app-constant';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  email: String;
  password: String;
  password1: String;

  error = {
    email: false,
    password: false,
    password1: false
  };
  constructor(
    private appService: AppService,
    private messageService: ToastMessageService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
  }

  onSignIn() {
    this.dialogService.hide();
    const diagloConfig = new DialogConfig();
    diagloConfig.show = true;
    diagloConfig.form = DialogConfigForms.LOGIN;
    diagloConfig.header = "Sign In";
    this.dialogService.show(diagloConfig);
  }
  onSignUp() {
    if (this.validate()) {
      this.appService.registerCutomer(this.email, this.email, this.password).subscribe(
        response => {
          this.messageService.show(new ToastMessage(MessageType.SUCCESS, MESSAGES.SUCCESS.LOGIN));
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

    if (!this.password1) {
      this.error.password1 = true;
      flag = false;

      const msg = new ToastMessage(MessageType.ERROR, MESSAGES.EMPTY_PASSWORD);
      this.messageService.show(msg);
    } else {
      this.error.password1 = false;
    }

    if (this.password !== this.password1) {
      this.error.password = true;
      this.error.password1 = true;
      flag = false;

      const msg = new ToastMessage(MessageType.ERROR, MESSAGES.PASSWORD_NOT_MATCH);
      this.messageService.show(msg);
    }
    return flag;
  }

}
