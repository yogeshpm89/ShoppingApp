import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { COLORS, SIZES } from '../../constants/app-constant';

@Component({
  selector: 'app-product-specification',
  templateUrl: './product-specification.component.html',
  styleUrls: ['./product-specification.component.scss']
})
export class ProductSpecificationComponent implements OnInit {

  @Input() product: Product;

  colors = COLORS;
  sizes = SIZES;

  productQuantity = 1;

  constructor() { }

  ngOnInit() {
  }


  onProductQuantityPlus() {
    this.productQuantity = this.productQuantity + 1;
  }

  onProductQuantityMinus() {
    if (this.productQuantity < 2) return;
    this.productQuantity = this.productQuantity - 1;
  }

}
