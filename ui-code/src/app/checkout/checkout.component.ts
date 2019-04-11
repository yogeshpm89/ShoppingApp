import { Component, OnInit } from '@angular/core';
import { CheckoutUserForm } from '../models/checkout-user-form';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutUserForm: CheckoutUserForm = new CheckoutUserForm();
  
  currentCheckoutForm = 0;
  buttonLabel = {
    next: 'Next Step',
    prev: 'Back'
  }
  
  constructor() { }

  ngOnInit() {
  }

  updateForm(value) {
    if (value === 'N') {
      this.currentCheckoutForm = this.currentCheckoutForm + 1;
    }

    if (value === 'B') {
      this.currentCheckoutForm = this.currentCheckoutForm - 1;
    }

    if (this.currentCheckoutForm === 2) {
      this.buttonLabel.next = "Pay";
    }
  }
}
