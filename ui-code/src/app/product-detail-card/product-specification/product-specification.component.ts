import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { COLORS, SIZES } from '../../constants/app-constant';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-product-specification',
  templateUrl: './product-specification.component.html',
  styleUrls: ['./product-specification.component.scss']
})
export class ProductSpecificationComponent implements OnInit {

  @Input() product: Product;

  selectedColor: String;
  selectedSize: String;
  
  colors = COLORS;
  sizes = SIZES;

  productQuantity = 1;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
  }


  onProductQuantityPlus() {
    this.productQuantity = this.productQuantity + 1;
  }

  onProductQuantityMinus() {
    if (this.productQuantity < 2) return;
    this.productQuantity = this.productQuantity - 1;
  }

  onSizeClick(size) {
    this.selectedSize = size;
  }

  onColorClick(color) {
    this.selectedColor = color;
  }
  
  onAddToCart() {
    const attributes = this.selectedSize + ", " + this.selectedColor;
    this.appService.addToShoppingCart(this.product.product_id, attributes).subscribe(
      response => {
        console.log("added successfully");
      }
    )
  }
}
