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
  productThumbnailCount = 10;
  constructor() { }

  ngOnInit() {
    this.selectedImage = AppConstant.PRODUCTS_IMAGE_URL + this.product.image;

    if (this.product.image) {
      this.productImages.push(AppConstant.PRODUCTS_IMAGE_URL + this.product.image);
      for (let i = 2; i < this.productThumbnailCount; i++) {
        if (this.product['image_' + i]) {
          this.productImages.push(AppConstant.PRODUCTS_IMAGE_URL + this.product['image_' + i]);
        } else {
          break;
        }
      }
    }
  }

}
