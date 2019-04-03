import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { AppConstant } from '../constants/app-constant';

@Component({
  selector: 'app-product-detail-images',
  templateUrl: './product-detail-images.component.html',
  styleUrls: ['./product-detail-images.component.scss']
})
export class ProductDetailImagesComponent implements OnInit {

  @Input() product: Product;
  selectedImage: String
  productImages = [];
  constructor() { }

  ngOnInit() {
    this.selectedImage = AppConstant.PRODUCTS_IMAGE_URL + this.product.image;
    this.productImages.push(AppConstant.PRODUCTS_IMAGE_URL + this.product.image);
    this.productImages.push(AppConstant.PRODUCTS_IMAGE_URL + this.product.image_2);
    this.productImages.push(AppConstant.PRODUCTS_IMAGE_URL + this.product.image_3);
  }

}
