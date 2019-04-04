export class DialogConfig {
    show: boolean = false;
    form: DialogConfigForms;
    header: String;
    size: String
}

export enum DialogConfigForms {
    LOGIN = 'login',
    SIGN_UP = 'signup',
    CART = 'cart'
}

export enum DialogSizes {
    LARGE = 'large'
}
