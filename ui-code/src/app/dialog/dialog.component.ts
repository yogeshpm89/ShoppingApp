import { Component, OnInit } from '@angular/core';
import { DialogService } from '../services/dialog.service';
import { DialogConfig, DialogConfigForms } from './dialog-config';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  dialogConfig: DialogConfig;
  dialogConfigForms = DialogConfigForms;

  constructor(
    private dialogService: DialogService
  ) { 
    this.dialogService.dialogSource$.subscribe(
      input => {
        this.dialogConfig = input;
      }
    )
  }

  ngOnInit() {
  }

  close() {
    this.dialogService.hide();
  }

}
