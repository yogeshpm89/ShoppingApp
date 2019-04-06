export class ToastMessage {

    constructor(type: MessageType, text: string) {
      this.type = type;
      this.text = text;
    }
    type: MessageType;
    text: string;
    messageId: number;
}

export enum MessageType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning'
}
