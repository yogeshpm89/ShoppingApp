import { Cart } from './../../models/cart';
import { CartService } from './../../services/cart.service';
import { MESSAGES } from "./../../constants/app-constant";
import { MessageType, ToastMessage } from "./../../models/message";
import { ToastMessageService } from "./../../services/toast-message.service";
import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../../models/product";
import { COLORS, SIZES } from "../../constants/app-constant";
import { AppService } from "../../services/app.service";

@Component({
  selector: "app-product-specification",
  templateUrl: "./product-specification.component.html",
  styleUrls: ["./product-specification.component.scss"]
})
export class ProductSpecificationComponent implements OnInit {
  @Input() product: Product;

  selectedColor: string;
  selectedSize: string;

  error = {
    selectedColor: false,
    selectedSize: false
  };

  colors = COLORS;
  sizes = SIZES;

  productQuantity = 1;

  constructor(
    private appService: AppService,
    private messageService: ToastMessageService,
    private cartService: CartService
  ) {}

  ngOnInit() {}

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
    if (this.validate()) {
      const attributes = this.selectedSize + ', ' + this.selectedColor;
      this.appService
        .addToShoppingCart(this.product.product_id, attributes)
        .subscribe(response => {
          this.cartService.updateCartInUI(response as Cart[]);
          this.messageService.show(
            new ToastMessage(MessageType.SUCCESS, MESSAGES.SUCCESS.ADD_CART)
          );
        });
    }
  }

  validate() {
    let flag = true;
    if (!this.selectedColor) {
      this.error.selectedColor = true;
      this.messageService.show(
        new ToastMessage(MessageType.ERROR, MESSAGES.ERROR.COLOR)
      );
      flag = flag && false;
    } else {
      flag = flag && true;
    }

    if (!this.selectedSize) {
      this.error.selectedSize = true;
      this.messageService.show(
        new ToastMessage(MessageType.ERROR, MESSAGES.ERROR.SIZE)
      );
      flag = flag && false;
    } else {
      flag = flag && true;
    }

    return flag;
  }
}
