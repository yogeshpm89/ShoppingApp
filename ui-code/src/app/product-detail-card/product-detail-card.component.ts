import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../services/app.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { COLORS, SIZES } from '../constants/app-constant';

@Component({
  selector: 'app-product-detail-card',
  templateUrl: './product-detail-card.component.html',
  styleUrls: ['./product-detail-card.component.scss']
})
export class ProductDetailCardComponent implements OnInit {

  @Input() productId: Number;
  product:Product;

  colors = COLORS;
  sizes = SIZES;

  

  constructor(
    private appService : AppService
  ) { }

  ngOnInit() {
    this.getProductDetails();
  }

  getProductDetails() {
    this.appService.getProductDetail(this.productId).subscribe(
      response => {
        this.product = <Product> response[0];
      }
    )
  }

  
}
