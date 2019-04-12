export const AppConstant = {
    SERVER_URL: 'https://backendapi.turing.com/',
    PRODUCTS_IMAGE_URL: 'https://backendapi.turing.com/images/products/',
    END_POINTS: {
        DEPARTMENTS: 'departments',
        CATEGORIES: 'categories',
        ATTRIBUTES: 'attributes',
        PRODUCTS: 'products',
        PRODUCT_DETAILS: 'products/{productId}/details',
        PRODUCT_REVIEWS: 'products/{productId}/reviews',
        SEARCH_PRODUCTS: 'products/search',
        CUSTOMERS: 'customers',
        CUSTOMERS_LOGIN: 'customers/login',
        ORDERS: 'orders',
        SHOPPING_CART: 'shoppingcart',
        GENERATE_SHOPPING_CART_ID: 'shoppingcart/generateUniqueId',
        SHOPPING_CART_ADD: 'shoppingcart/add',
        SHOPPING_CART_REMOVE_PRODUCT: 'shoppingcart/removeProduct/{itemId}',
        GET_SHOPPING_CART_CONTENTS: 'shoppingcart/{cartId}',
        GET_SHOPPING_CART_AMOUNT: 'shoppingcart/totalAmount/{cartId}',
        TAX: 'tax',
        SHIPPING: 'shipping/regions',
        SHIPPING_OPTIONS: 'shipping/regions/{shipping_region_id}',
        STRIPE: 'stripe',
        STRIPE_CHARGE: 'stripe/charge'
    }
}


export const COLORS = ['blue', 'red', 'orange', 'green', 'light-green'];
export const SIZES = ['XS', 'S', 'M', 'L', 'XL'];


export const MESSAGES = {
  EMPTY_EMAIL: 'Please enter email address',
  EMPTY_PASSWORD: 'Please enter password',
  PASSWORD_NOT_MATCH: 'Passwords are not matching',

  EMPTY_NICK_NAME: 'Please enter nickname',
  EMPTY_REVIEW: 'Please enter review',
  EMPTY_RATING: 'Please enter rating',

  SUCCESS: {
    LOGIN: 'Login successfully',
    ADD_CART: 'Product added to cart',
    PRODUCT_REVIEW: 'Product review saved'
  },

  ERROR: {
    NO_LOGIN: 'Please login to continue',
    NO_CART_ITEMS: 'No items in cart to checkout',
    LOGIN: 'Invalid email or password',
    COLOR: 'Please select color',
    SIZE: 'Please select size',
    PRODUCT_REVIEW: 'Fail to submit product review',
    PAYMENT: 'Something went wrong, please try again'
  }
}


export const paymentCardStyle = {
  base: {
    color: 'red',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
}

export const CARD = elements.create('card', {style: paymentCardStyle});