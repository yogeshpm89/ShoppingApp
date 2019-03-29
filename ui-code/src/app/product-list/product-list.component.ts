import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Product } from '../models/product';
import { GlobalSearchService } from '../services/global-search.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  searchingFlag = false;
  productList: Product[] = [];
  constructor(
    private globalSearchService: GlobalSearchService,
    private appService: AppService) { 
      this.globalSearchService.globalSearchSource$.subscribe(
        gloalSearchText => {
          if (!gloalSearchText) {
            this.getProducts();
          } else {
            this.searchProducts(gloalSearchText);
          }
        }
      )
    }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.searchingFlag = true;
    this.appService.getProducts().subscribe(
      response => {
        this.productList = response['rows'];
        this.searchingFlag = false;
      }
    )
  }

  searchProducts(text) {
    this.searchingFlag = true;
    this.appService.searchProducts(text).subscribe(
      response => {
        this.productList = response['rows'];
        this.searchingFlag = false;
      }
    )
  }
}
