import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartId: String;
  cartList: Cart[];

  constructor() { }

  setCartId(id: String) {
    this.cartId = id;
  }

  getCartId() {
    return this.cartId;
  }

}
