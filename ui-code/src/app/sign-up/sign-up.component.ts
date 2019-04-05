import { Component, OnInit } from '@angular/core';
import { Helper } from '../utilities/helper';
import { AppService } from '../services/app.service';

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
  }
  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
  }

  onSignUp() {
    if (this.validate()) {
      this.appService.registerCutomer(this.email, this.email, this.password).subscribe(
        response => {
          debugger
        }
      )
    }
  }

  validate() {
    debugger;
    let flag = true;
    if (!this.email || !Helper.validateEmail(this.email)) {
      this.error.email = true;
      flag = false;
    } else {
      this.error.email = false;
    }

    if (!this.password) {
      this.error.password = true;
      flag = false;
    } else {
      this.error.password = false;
    }

    if (!this.password1) {
      this.error.password1 = true;
      flag = false;
    } else {
      this.error.password1 = false;
    }

    if (this.password !== this.password1) {
      this.error.password = true;
      this.error.password1 = true;
      flag = false;
    }
    return flag;
  }

}
