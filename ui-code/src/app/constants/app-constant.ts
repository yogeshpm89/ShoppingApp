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
        ORDERS: 'orders',
        SHOPPING_CART: 'shoppingcart',
        GENERATE_SHOPPING_CART_ID: 'shoppingcart/generateUniqueId',
        SHOPPING_CART_ADD: 'shoppingcart/add',
        SHOPPING_CART_REMOVE_PRODUCT: 'shoppingcart/removeProduct/{itemId}',
        GET_SHOPPING_CART_CONTENTS: 'shoppingcart/{cartId}',
        TAX: 'tax',
        SHIPPING: 'shipping',
        STRIPE: 'stripe'
    }
}


export const COLORS = ['blue', 'red', 'orange', 'green', 'light-green'];
export const SIZES = ['XS', 'S', 'M', 'L', 'XL'];