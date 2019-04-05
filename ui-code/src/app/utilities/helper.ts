export class Helper {

    static validateEmail(mail: String) {
        let mailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        return mailRegex.test('' + mail);
    }
}
