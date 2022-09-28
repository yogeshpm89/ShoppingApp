import { Review } from './../models/review';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppConstant } from '../constants/app-constant';
import { LocalStorageService } from './local-storage.service';
import { CartService } from './cart.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient,
    private tokenService: TokenService,
    private cartService: CartService) { }

  getCategories(): Observable<Object> {
    const requestBody = {};
    return this.httpClient.get(AppConstant.END_POINTS.CATEGORIES, requestBody);
  }

  getDepartments(): Observable<Object> {
    const requestBody = {};
    return this.httpClient.get(AppConstant.END_POINTS.DEPARTMENTS, requestBody);
  }

 getProducts(page = 1, limit = 20): Observable<Object> {
    const requestBody = {};
    const url = AppConstant.END_POINTS.PRODUCTS + "?page=" + page + "&limit=" + limit;
    return this.httpClient.get(url, requestBody);
  }

  getProductDetail(productId): Observable<Object> {
    const requestBody = {};
    const url = AppConstant.END_POINTS.PRODUCT_DETAILS.replace('{productId}', productId);
    return this.httpClient.get(url, requestBody);
  }

  getProductReviews(productId): Observable<Object> {
    const requestBody = {};
    const url = AppConstant.END_POINTS.PRODUCT_REVIEWS.replace('{productId}', productId);
    return this.httpClient.get(url, requestBody);
  }

  addProductReview(productId: number, review: string, rating: number): Observable<Object> {
    const requestBody = {
      product_id: productId,
      review: review,
      rating: rating
    };
    const url = AppConstant.END_POINTS.PRODUCT_REVIEWS.replace('{productId}', '' + productId);
    return this.httpClient.post(url, requestBody);
  }

  searchProducts(text): Observable<Object> {
    const requestBody = {};
    const url = AppConstant.END_POINTS.SEARCH_PRODUCTS + "?query_string=" + text + "&page=1&limit=20";
    return this.httpClient.get(url, requestBody);
  }

  generateShoppingCartId(): Observable<Object> {
    const requestBody = {};
    return this.httpClient.get(AppConstant.END_POINTS.GENERATE_SHOPPING_CART_ID, requestBody);
  }

  addToShoppingCart(productId: Number, attibutes: String): Observable<Object> {
    const requestBody = {
      cart_id: this.cartService.getCartId(),
      product_id: productId,
      attributes: attibutes
    };
    return this.httpClient.post(AppConstant.END_POINTS.SHOPPING_CART_ADD, requestBody);
  }

  getShoppingCartContents(): Observable<Object> {
    const requestBody = {};
    const cartId = this.cartService.getCartId();
    if (!cartId) {
      of(null);
    } else {
      const url = AppConstant.END_POINTS.GET_SHOPPING_CART_CONTENTS.replace('{cartId}', '' + cartId);
      return this.httpClient.get(url, requestBody);
    }
  }

  // getShoppingCartAmount(): Observable<Object> {
    
  //   const cartId = this.cartService.getCartId();
  //   const requestBody = {
  //     cart_id: cartId 
  //   };
  //   if (!cartId) {
  //     of(null);
  //   } else {
  //     const url = AppConstant.END_POINTS.GET_SHOPPING_CART_AMOUNT.replace('{cartId}', '' + cartId);
  //     return this.httpClient.get(url, {params : requestBody, observe: requestBody});
  //   }
  // }

  removeProductFromCart(itemId): Observable<Object> {
    const requestBody = {};
    const url = AppConstant.END_POINTS.SHOPPING_CART_REMOVE_PRODUCT.replace('{itemId}', '' + itemId);
    return this.httpClient.delete(url, requestBody);
  }


  registerCutomer(name: String, email: String, password: String): Observable<Object> {
    const requestBody = {
      name: name,
      email: email,
      password: password
    };
    const url = AppConstant.END_POINTS.CUSTOMERS;
    return this.httpClient.post(url, requestBody);
  }

  loginCustomer(email: String, password: String) : Observable<Object> {
    const requestBody = {
      email: email,
      password: password
    };
    const url = AppConstant.END_POINTS.CUSTOMERS_LOGIN;
    return this.httpClient.post(url, requestBody);
  }


  getRegions(): Observable<Object> {
    const requestBody = {};
    return this.httpClient.get(AppConstant.END_POINTS.SHIPPING, requestBody);
  }

  getShippingOptions(region): Observable<Object> {
    const requestBody = {};
    const url = AppConstant.END_POINTS.SHIPPING_OPTIONS.replace('{shipping_region_id}', '' + region);
    return this.httpClient.get(url, requestBody);
  }

  getAllTaxes(): Observable<Object> {
    const requestBody = {};
    const url = AppConstant.END_POINTS.TAX;
    return this.httpClient.get(url, requestBody);
  }

  createOrder(shippingId, taxId): Observable<Object> {
    const requestBody = {
      cart_id: this.cartService.getCartId(),
      customer_id: this.tokenService.getUser().customer_id,
      shipping_id: shippingId,
      tax_id: taxId
    };
    const url = AppConstant.END_POINTS.ORDERS;
    return this.httpClient.post(url, requestBody);
  }

  stripeCharge(stripeToken, orderId, description, amount): Observable<Object> {
    
    const requestBody = {
      stripeToken: stripeToken.id,
      order_id: orderId, // this.tokenService.getUser().customer_id,
      description: description,
      amount: Math.floor(amount)
    };

    const url = AppConstant.END_POINTS.STRIPE_CHARGE;
    return this.httpClient.post(url, requestBody);
  }
}
