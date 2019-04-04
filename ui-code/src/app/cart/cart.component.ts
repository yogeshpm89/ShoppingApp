import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AppService } from '../services/app.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: Cart[];
  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.getShoppingCartContents();
  }

  getShoppingCartContents() {
    this.cartItems = [];
    this.appService.getShoppingCartContents().subscribe(
      response => {
        this.cartItems = <Cart[]>response;
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
}
