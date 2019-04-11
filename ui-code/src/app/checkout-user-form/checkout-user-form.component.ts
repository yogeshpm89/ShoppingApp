import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../services/app.service';
import { ShippingRegion } from '../models/shipping-region';
import { ShippingRegionOption } from '../models/shipping-region-option';
import { CheckoutUserForm } from '../models/checkout-user-form';

@Component({
  selector: 'app-checkout-user-form',
  templateUrl: './checkout-user-form.component.html',
  styleUrls: ['./checkout-user-form.component.scss']
})
export class CheckoutUserFormComponent implements OnInit {

  @Input() checkoutUserForm: CheckoutUserForm = new CheckoutUserForm();

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.getAvailableCountryList();
  }

  getAvailableCountryList() {
    this.appService.getRegions().subscribe(
      response => {
        this.checkoutUserForm.countryList = response as ShippingRegion[];
      }
    )
  }

  onCountryChange(e) {
    const countryValue = e.target.value;
    if (parseInt(countryValue) > 1) {
      this.appService.getShippingOptions(countryValue).subscribe(
        response => {
          this.checkoutUserForm.shippingOptionList = response as ShippingRegionOption[];
          this.checkoutUserForm.shippingRegion = null;
        }
      )
    }
  }

}
