export class DialogConfig {
    show: boolean = false;
    form: DialogConfigForms;
    header: String;
}

export enum DialogConfigForms {
    LOGIN = 'login',
    SIGN_UP = 'signup'
}
