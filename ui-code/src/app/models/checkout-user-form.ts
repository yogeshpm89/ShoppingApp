import { ShippingRegion } from './shipping-region';
import { ShippingRegionOption } from './shipping-region-option';

export class CheckoutUserForm {
    firstName: string = "Yogesh";
    lastName: string = "Murdeshwar";
    address: string = "Sanket park 2, mohammad wadi road";
    city: string = "Pune";
    state: string = "Maharashtra";
    zip: string = "411060";
    country: number;
    countryList: ShippingRegion[];

    shippingRegion: ShippingRegionOption;
    shippingOptionList: ShippingRegionOption[];

    error = {
        firstName: false,
        lastName: false,
        address: false,
        city: false,
        state: false,
        zip: false,
        country: false
    }
}
