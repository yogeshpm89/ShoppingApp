import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Product } from '../models/product';
import { GlobalSearchService } from '../services/global-search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  searchingFlag = false;
  productList: Product[] = [];

  page = 1;
  limit = 12;
  paginationPageCount = 10;

  constructor(
    private router: Router,
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

  getProducts(page = null) {
    this.searchingFlag = true;
    if (page) this.page = page;
    this.appService.getProducts(this.page, this.limit).subscribe(
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

  onProductBuy(product: Product) {
    this.router.navigate(['product/' + product.product_id]).then( (e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
}
