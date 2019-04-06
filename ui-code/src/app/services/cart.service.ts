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
    this.cartId = id;
  }

  getCartId() {
    return this.cartId;
  }

}
