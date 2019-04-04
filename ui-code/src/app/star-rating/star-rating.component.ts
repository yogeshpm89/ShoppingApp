import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input() maxCount = 5;
  @Input() value = 3;

  starArray = [];
  constructor() { }

  ngOnInit() {
    for (let i=0; i<this.maxCount; i++) {
      this.starArray.push({checked: (i<this.value)})
    }
  }

}
