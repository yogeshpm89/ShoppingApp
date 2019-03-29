import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstant } from '../constants/app-constant';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Object> {
    const requestBody = {};
    return this.httpClient.get(AppConstant.END_POINTS.CATEGORIES, requestBody);
  }

  getDepartments(): Observable<Object> {
    const requestBody = {};
    return this.httpClient.get(AppConstant.END_POINTS.DEPARTMENTS, requestBody);
  }

  
  getProducts(): Observable<Object> {
    const requestBody = {};
    return this.httpClient.get(AppConstant.END_POINTS.PRODUCTS, requestBody);
  }

  searchProducts(text): Observable<Object> {
    const requestBody = {};
    const url = AppConstant.END_POINTS.SEARCH_PRODUCTS + "?query_string=" + text + "&page=1&limit=20";
    return this.httpClient.get(url, requestBody);
  }
}
