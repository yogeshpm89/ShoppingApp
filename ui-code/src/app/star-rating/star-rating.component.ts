import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input() maxCount = 5;
  @Input() value = -1;
  @Input() readonly = true;

  @Output() valueChange = new EventEmitter();

  starArray = [];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.maxCount; i++) {
      this.starArray.push({checked: (i < this.value)});
    }
  }

  onHover(i) {
    if (this.readonly) {
      return;
    }
    this.value = i;
    this.valueChange.emit(i+1);
  }

}
