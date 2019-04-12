import { Subject } from 'rxjs';
import { Customer } from './../models/customer';
import { Injectable } from '@angular/core';
import { ToastMessage, MessageType } from '../models/message';
import { MESSAGES } from '../constants/app-constant';
import { ToastMessageService } from './toast-message.service';
import { DialogConfig, DialogConfigForms } from '../dialog/dialog-config';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  user: Customer;
  private token = null;
  private expiresIn = null;
  constructor(
    private messageService: ToastMessageService,
    private dialogService: DialogService
  ) { }

  loggedInUser = new Subject<Customer>();
  loggedInUserSource$ = this.loggedInUser.asObservable();

  getToken() {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }

  setExpiresIn(value: string) {
    this.expiresIn = value;
  }

  getExpiresIn() {
    return this.expiresIn;
  }

  setUser(user: Customer) {
    this.user = user;
    this.loggedInUser.next(user);
  }

  getUser() {
    return this.user;
  }

  checkLoggedinUser() {
    const user = this.getUser();

    if (!user) {
      this.messageService.show(new ToastMessage(MessageType.ERROR, MESSAGES.ERROR.NO_LOGIN));
      this.login();
      return false;
    }
    return true;
  }

  login() {
    const diagloConfig = new DialogConfig();
    diagloConfig.show = true;
    diagloConfig.form = DialogConfigForms.LOGIN;
    diagloConfig.header = "Sign In";
    this.dialogService.show(diagloConfig);
  }
}
