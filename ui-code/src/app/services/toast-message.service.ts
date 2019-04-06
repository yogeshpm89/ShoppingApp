import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastMessage } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor() { }

  private messageSource = new Subject<ToastMessage>();
  messageSource$ = this.messageSource.asObservable();

  show(message: ToastMessage) {
    this.messageSource.next(message);
  }
}
