import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CheckoutUserForm } from '../models/checkout-user-form';
import { AppService } from '../services/app.service';
import { Cart } from '../models/cart';
import { ShippingRegion } from '../models/shipping-region';
import { ShippingRegionOption } from '../models/shipping-region-option';

@Component({
  selector: 'app-checkout-confirmation',
  templateUrl: './checkout-confirmation.component.html',
  styleUrls: ['./checkout-confirmation.component.scss']
})
export class CheckoutConfirmationComponent implements OnInit {

  @Input() orderSummary;
  @Input() checkoutUserForm: CheckoutUserForm;

  cartItems: Cart[];
  address = "";
  shippingRegionText: ShippingRegionOption;

  subtotal: number = 0;
  grandtotal: number = 0;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getCartItems();
    this.formAddress();
    this.shippingRegionText = this.checkoutUserForm.shippingOptionList.find((item) => {
      return '' + item.shipping_id === '' + this.checkoutUserForm.shippingRegion
    });
  }

  ngAfterViewChecked() {
    if (!this.address) {
      this.formAddress();
    }
  }

  formAddress() {
    this.address = this.checkoutUserForm.address
               + ", " + this.checkoutUserForm.city
               + ", " + this.checkoutUserForm.state
               + ", " + this.checkoutUserForm.country
               + ", " + this.checkoutUserForm.zip
  }

  getCartItems() {
    this.appService.getShoppingCartContents().subscribe(
      response => {
        this.cartItems = response as Cart[];

        for (let item of this.cartItems) {
          this.subtotal = this.subtotal + +item.price * +item.quantity;
        }

        this.grandtotal = this.subtotal;
      }
    )
  }

}
