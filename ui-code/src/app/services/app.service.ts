import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstant } from '../constants/app-constant';
import { LocalStorageService } from './local-storage.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient,
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
    const url = AppConstant.END_POINTS.GET_SHOPPING_CART_CONTENTS.replace('{cartId}', '' + this.cartService.getCartId());
    return this.httpClient.get(url, requestBody);
  }

  removeProductFromCart(itemId): Observable<Object> {
    const requestBody = {};
    const url = AppConstant.END_POINTS.SHOPPING_CART_REMOVE_PRODUCT.replace('{itemId}', '' + itemId);
    return this.httpClient.delete(url, requestBody);
  }
}
