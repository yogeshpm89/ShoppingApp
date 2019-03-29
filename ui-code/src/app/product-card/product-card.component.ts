import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { AppConstant } from '../constants/app-constant';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product = null;

  thumbnail = "";
  constructor() { }

  ngOnInit() {
    this.thumbnail = AppConstant.PRODUCTS_IMAGE_URL +  this.product.thumbnail;
  }

}
