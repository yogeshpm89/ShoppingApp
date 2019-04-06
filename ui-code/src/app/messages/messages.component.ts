import { ToastMessage, MessageType } from './../models/message';
import { Component, OnInit } from '@angular/core';
import { ToastMessageService } from '../services/toast-message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messageList: ToastMessage[] = [];
  messageId = 0;
  messageTypes = MessageType;
  constructor(private messageService: ToastMessageService) {
    this.messageService.messageSource$.subscribe(
      message => {
        const index = this.messageList.findIndex((msg) => {
          const msgString = msg.messageId +  msg.type + msg.text;
          const messageObjString = message.messageId + message.type + message.text;
          return msgString === messageObjString;
        });
        if (index === -1) {
          message.messageId = this.messageId++;
          this.messageList.push(message);
          this.autoHideMessageTimeout(message);
        }

      }
    )
   }

   autoHideMessageTimeout(message: ToastMessage) {
    const messages = this.messageList;
    setTimeout(() => {
      console.log(message.messageId);
      messages.splice(messages.indexOf(message), 1);
    }, 5000);
  }

  ngOnInit() {
  }

}
