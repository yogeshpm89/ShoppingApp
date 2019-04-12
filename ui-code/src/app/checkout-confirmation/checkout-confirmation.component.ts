import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CheckoutUserForm } from '../models/checkout-user-form';
import { AppService } from '../services/app.service';
import { Cart } from '../models/cart';
import { ShippingRegion } from '../models/shipping-region';
import { ShippingRegionOption } from '../models/shipping-region-option';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout-confirmation',
  templateUrl: './checkout-confirmation.component.html',
  styleUrls: ['./checkout-confirmation.component.scss']
})
export class CheckoutConfirmationComponent implements OnInit, OnChanges {

  @Input() orderSummary;
  @Input() checkoutUserForm: CheckoutUserForm;
  @Input() cartItems: Cart[];
  @Input() cartItemsLoaded = false;

  address = "";
  shippingRegionText: ShippingRegionOption;

  subtotal: number = 0;
  grandtotal: number = 0;

  constructor(private appService: AppService,
    private cartService: CartService) { }

  ngOnInit() {
    this.formAddress();
    this.shippingRegionText = this.checkoutUserForm.shippingOptionList.find((item) => {
      return '' + item.shipping_id === '' + this.checkoutUserForm.shippingRegion
    });
  }

  ngOnChanges() {
    if (!this.address) {
      this.formAddress();
    }

    if (this.cartItemsLoaded) {
      this.subtotal = this.cartService.getCartAmount(this.cartItems);
      this.grandtotal = this.subtotal;
    }
  }

  formAddress() {
    this.address = this.checkoutUserForm.address
               + ", " + this.checkoutUserForm.city
               + ", " + this.checkoutUserForm.state
               + ", " + this.checkoutUserForm.country
               + ", " + this.checkoutUserForm.zip
  }

  
 
  }
