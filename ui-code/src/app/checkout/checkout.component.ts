import { Component, OnInit } from '@angular/core';
import { CheckoutUserForm } from '../models/checkout-user-form';
import { AppService } from '../services/app.service';
import { Tax } from '../models/tax';
import { TokenService } from '../services/token.service';
import { ToastMessageService } from '../services/toast-message.service';
import { ToastMessage, MessageType } from '../models/message';
import { MESSAGES, paymentCardStyle, CARD } from '../constants/app-constant';
import { DialogConfig, DialogConfigForms } from '../dialog/dialog-config';
import { DialogService } from '../services/dialog.service';
import { Cart } from '../models/cart';
import { LocalStorageService } from '../services/local-storage.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutUserForm: CheckoutUserForm = new CheckoutUserForm();
  cardHolderName = "";
  paymentCard = CARD;
  stripToken = null;
  orderId = null;
  cartItems: Cart[] = [];
  cartItemsLoaded = false;
  taxList: Tax[];
  tax: Tax;
  taxId: number;

  currentCheckoutForm = 0;
  button = {
    next: 'Next Step',
    disableNext: false,
    prev: 'Back',
    disablePrev: false
  }

  constructor(private appService: AppService,
    private messageService: ToastMessageService,
    private dialogService: DialogService,
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private tokenService: TokenService) { }

  ngOnInit() {
  }

  getAllTaxes() {
    this.appService.getAllTaxes().subscribe(
      response => {
        this.taxList = response as Tax[];
        if (this.taxList) this.tax = this.taxList[0];
        if (this.tax) this.taxId = this.tax.tax_id;
      }
    )
  }

  login() {
    const diagloConfig = new DialogConfig();
    diagloConfig.show = true;
    diagloConfig.form = DialogConfigForms.LOGIN;
    diagloConfig.header = "Sign In";
    this.dialogService.show(diagloConfig);
  }

  createOrder(value) {
    this.orderId = null;
    this.appService.createOrder(this.checkoutUserForm.shippingRegion.shipping_id, this.taxId).subscribe(
      response => {
        this.orderId = response['orderId'];
        // this.localStorageService.clearCartId();
        this.updateFormCounter(value);
      }
    )
  }

  getCartItems(value) {
    this.cartItemsLoaded = false;
    this.appService.getShoppingCartContents().subscribe(
      response => {
        this.cartItems = response as Cart[];
        this.cartItemsLoaded = true;
        if (this.cartItems.length == 0) {
          this.button.disableNext = true;
        }
        this.updateFormCounter(value);
      }
    )
  }

  checkLoggedinUser() {
    const user = this.tokenService.getUser();

    if (!user) {
      this.messageService.show(new ToastMessage(MessageType.ERROR, MESSAGES.ERROR.NO_LOGIN));
      this.login();
      return false;
    }

    return true;
  }

  updateForm(value) {

    if (!this.tokenService.checkLoggedinUser()) {
      return;
    }

    this.button.disableNext = false;

    if (this.currentCheckoutForm == 0) {
      this.getAllTaxes();
      this.getCartItems(value);
    }


    if (this.currentCheckoutForm === 1) {
      this.button.next = "Pay";
      this.createOrder(value);
    }


    if (this.currentCheckoutForm === 2) {
      this.onPayment(value)
    }
  }

  updateFormCounter(value) {
    debugger;
    if (value === 'N') {
      this.currentCheckoutForm = this.currentCheckoutForm + 1;
    }

    if (value === 'B') {
      this.currentCheckoutForm = this.currentCheckoutForm - 1;
    }
  }


  onPayment(value) {
    // event.preventDefault();
    debugger;
    stripe.createToken(this.paymentCard).then((result) => {
      if (result.error) {
        // Inform the user if there was an error.
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server.
        this.stripToken = result.token;
        this.stripeCharge(value);
      }
    });
  }


  stripeCharge(value) {
    // stripeToken, orderId, description, amount
    if (!this.stripToken || !this.orderId) {
      this.messageService.show(new ToastMessage(MessageType.ERROR, MESSAGES.ERROR.PAYMENT));
      return;
    }

    const amount = this.cartService.getCartAmount(this.cartItems);
    this.appService.stripeCharge(this.stripToken, this.orderId, this.cardHolderName, amount).subscribe(
      response => {
        debugger;
        this.updateFormCounter(value);
      }
    );    
  }
}
