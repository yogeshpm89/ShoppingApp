import { AppService } from './../services/app.service';
import { MESSAGES, AppConstant } from './../constants/app-constant';
import { ToastMessage, MessageType } from './../models/message';
import { Component, OnInit, Input } from "@angular/core";
import { ToastMessageService } from '../services/toast-message.service';

@Component({
  selector: "app-add-product-review",
  templateUrl: "./add-product-review.component.html",
  styleUrls: ["./add-product-review.component.scss"]
})
export class AddProductReviewComponent implements OnInit {
  @Input() productId: number;

  nickName = '';
  review = '';
  rating = -1;

  clearForm() {
    this.nickName = '';
    this.review = '';
    this.rating = -1;
  }
  error = {
    nickName: false,
    review: false,
    rating: false
  };
  constructor(
    private messageService: ToastMessageService,
    private appService: AppService
  ) {}

  ngOnInit() {}

  onRatingChange(rating) {
    this.rating = rating;
  }

  onReviewSubmit() {
    if (this.validate()) {
      this.appService.addProductReview(this.productId, this.review, this.rating).subscribe(
        response => {
          this.messageService.show(new ToastMessage(MessageType.SUCCESS, MESSAGES.SUCCESS.PRODUCT_REVIEW));
          this.clearForm();
        },
        error => {
          this.messageService.show(new ToastMessage(MessageType.ERROR, MESSAGES.ERROR.PRODUCT_REVIEW));
        }
      )
    }
  }

  validate() {
    let flag = true;
    if (!this.nickName) {
      this.error.nickName = true;
      flag = false;
      const msg = new ToastMessage(MessageType.ERROR, MESSAGES.EMPTY_NICK_NAME);
      this.messageService.show(msg);
    } else {
      this.error.nickName = false;
    }

    if (!this.review) {
      this.error.review = true;
      flag = false;
      const msg = new ToastMessage(MessageType.ERROR, MESSAGES.EMPTY_REVIEW);
      this.messageService.show(msg);
    } else {
      this.error.review = false;
    }

    if (!this.rating || this.rating < 0) {
      this.error.rating = true;
      flag = false;
      const msg = new ToastMessage(MessageType.ERROR, MESSAGES.EMPTY_RATING);
      this.messageService.show(msg);
    } else {
      this.error.rating = false;
    }

    return flag;
  }
}
