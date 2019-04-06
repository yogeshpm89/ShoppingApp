import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { GlobalSearchService } from '../services/global-search.service';
import { DialogService } from '../services/dialog.service';
import { DialogConfig, DialogConfigForms, DialogSizes } from '../dialog/dialog-config';
import { TokenService } from '../services/token.service';
import { Customer } from '../models/customer';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu = ["Women", "Men", "Kids", "Shoes", "Brands"];
  globalSearchText = null;
  loggedInUser: Customer;
  cartCount = 0;
  constructor(
    private globalSearchService: GlobalSearchService,
    private appService: AppService,
    private dialogService: DialogService,
    private loginTokenService: TokenService,
    private cartService: CartService
  ) {
    this.loginTokenService.loggedInUserSource$.subscribe(
      user => {
        this.loggedInUser = user;
      }
    )

    this.cartService.updatedCartSource$.subscribe(
      cartList =>  {
        this.cartCount = (cartList as Cart[]).length;
      }
    )
  }

  ngOnInit() {
    // this.getCustomers();
    this.getShoppingCartContents();
  }

  getCustomers() {
  }

  getShoppingCartContents() {
    this.appService.getShoppingCartContents().subscribe(
      response => {
        if (response) {
          this.cartCount = (response as Cart[]).length;
        }
      }
    )
  }

  onGlobalSearch(event) {
    if (event.keyCode === 13) {
      // call global search
      this.globalSearchService.globalSearch(this.globalSearchText);
    }
  }

  onLogin() {
    const diagloConfig = new DialogConfig();
    diagloConfig.show = true;
    diagloConfig.form = DialogConfigForms.LOGIN;
    diagloConfig.header = "Sign In";
    this.dialogService.show(diagloConfig);
  }

  onSignup() {
    const diagloConfig = new DialogConfig();
    diagloConfig.show = true;
    diagloConfig.form = DialogConfigForms.SIGN_UP;
    diagloConfig.header = "Sign Up";
    this.dialogService.show(diagloConfig);
  }


  oncart() {
    const diagloConfig = new DialogConfig();
    diagloConfig.show = true;
    diagloConfig.form = DialogConfigForms.CART;
    diagloConfig.header = "";
    diagloConfig.size = DialogSizes.LARGE;
    this.dialogService.show(diagloConfig);
  }
}
