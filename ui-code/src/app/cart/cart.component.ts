import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AppService } from '../services/app.service';
import { Cart } from '../models/cart';
import { DialogService } from '../services/dialog.service';
import { TokenService } from '../services/token.service';
import { ToastMessageService } from '../services/toast-message.service';
import { ToastMessage, MessageType } from '../models/message';
import { AppConstant, MESSAGES } from '../constants/app-constant';
import { DialogConfig, DialogConfigForms } from '../dialog/dialog-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: Cart[];
  cartItemsLoaded = false;
  constructor(
    private appService: AppService,
    private dialogService: DialogService,
    private tokenService: TokenService,
    private toastMessageService: ToastMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getShoppingCartContents();
  }

  getShoppingCartContents() {
    this.cartItems = [];
    this.cartItemsLoaded = false;
    this.appService.getShoppingCartContents().subscribe(
      response => {
        this.cartItems = <Cart[]>response;
        this.cartItemsLoaded = true;
      }
    )
  }

  onRemove(item:Cart) {
    this.appService.removeProductFromCart(item.item_id).subscribe(
      response => {
        this.getShoppingCartContents();
      }
    )
  }

  onProductQuantityMinus(item: Cart) {
    item.quantity = +item.quantity - 1;
  }

  onProductQuantityPlus(item: Cart) {
    item.quantity = +item.quantity + 1;
  }

  onBackToShop() {
    this.dialogService.hide();
  }

  onCheckout() {
    // this.dialogService.hide();
    const loggedinUser = this.tokenService.getUser();
    if (this.cartItems.length === 0) {
      this.toastMessageService.show(new ToastMessage(MessageType.ERROR, MESSAGES.ERROR.NO_CART_ITEMS));
      return;
    }
    if (!loggedinUser) {
      this.toastMessageService.show(new ToastMessage(MessageType.ERROR, MESSAGES.ERROR.NO_LOGIN));
      this.login();
      return;
    }
    this.router.navigate(['/checkout']);
    this.dialogService.hide();
  }

  login() {
    const diagloConfig = new DialogConfig();
    diagloConfig.show = true;
    diagloConfig.form = DialogConfigForms.LOGIN;
    diagloConfig.header = "Sign In";
    this.dialogService.show(diagloConfig);
  }
}
