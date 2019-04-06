import { Subject } from 'rxjs';
import { Customer } from './../models/customer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  user: Customer;
  private token = null;
  private expiresIn = null;
  constructor() { }

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
}
