import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { AppService } from '../services/app.service';
import { Review } from '../models/review';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {

  @Input() productId: Number;
  reviewList: Review[];
  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.getProductReviews();
  }

  getProductReviews() {

    this.appService.getProductReviews(this.productId).subscribe(
      response => {
        this.reviewList = <Review[]> response;
      }
    )
  }
}
