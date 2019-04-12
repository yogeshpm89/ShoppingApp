import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartId: string;
  cartList: Cart[];

  constructor() { }

  private updatedCart = new Subject<Cart[]>();
  updatedCartSource$ = this.updatedCart.asObservable();


  updateCartInUI(cartList: Cart[]) {
    this.cartList = cartList;
    this.updatedCart.next(cartList);
  }

  setCartId(id: string) {
    console.log('set cart id');
    this.cartId = id;
  }

  getCartId() {
    console.log('get cart id');
    return this.cartId;
  }

  getCartAmount(cartItems: Cart[]) {
    let total = 0;
    if (cartItems) {
      for (let item of cartItems) {
        total = total + +item.price * +item.quantity;
      }
    }
    return total;
  }
}
