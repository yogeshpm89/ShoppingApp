import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogConfig } from '../dialog/dialog-config';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }


  private dialogSource = new Subject<DialogConfig>();
  dialogSource$ = this.dialogSource.asObservable();

  show(dialogConfig: DialogConfig) {
    this.dialogSource.next(dialogConfig);
  }

  hide() {
    const dialogConfig = new DialogConfig();
    dialogConfig.show = false;
    this.dialogSource.next(dialogConfig);
  }
}
