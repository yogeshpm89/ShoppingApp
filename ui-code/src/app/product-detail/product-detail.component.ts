import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: Number;
  constructor(
    private route: ActivatedRoute
  ) {
    
   }

  ngOnInit() {
    this.productId = +this.route.snapshot.paramMap.get('productId');
  }

}
