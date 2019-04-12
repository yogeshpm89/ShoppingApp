import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef, Input } from '@angular/core';
import { NgForm, Form } from '@angular/forms';

@Component({
  selector: 'app-checkout-stripe',
  templateUrl: './checkout-stripe.component.html',
  styleUrls: ['./checkout-stripe.component.scss']
})
export class CheckoutStripeComponent implements OnInit {

  @Input() cardHolderName;
  
  @ViewChild('checkout') checkout: NgForm;
  @Input() card;
  constructor() {

  }

  ngOnInit() {

    this.card.mount('#card-element');
    this.card.addEventListener('change', function(event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
  }

  
  stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);
  
    // Submit the form
    this.checkout.ngSubmit.emit()
  }
}
