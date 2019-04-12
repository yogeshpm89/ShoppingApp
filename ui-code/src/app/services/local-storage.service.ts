import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private appService: AppService) { }

  getCartId(): Observable<any> {
    const cartId = window.localStorage.getItem('cartId');
    if (!cartId) {
      return this.appService.generateShoppingCartId();
    } else {
      return of({ "cart_id": cartId});
    }
  }

  setCartId(cartId) {
    window.localStorage.setItem('cartId', cartId);
  }

  clearCartId() {
    window.localStorage.removeItem('cartId');
  }
}
