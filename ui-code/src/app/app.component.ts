import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { CartService } from './services/cart.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit  {
  title = 'turing-frontend-challenge';

  constructor(private localStorageService: LocalStorageService,
    private cartService: CartService) {

  }

  ngOnInit() {
    this.localStorageService.getCartId().subscribe(
      response => {
        this.localStorageService.setCartId(response['cart_id']);
        this.cartService.setCartId(response['cart_id']);
      }
    )

  }



}
