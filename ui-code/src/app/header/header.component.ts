import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { GlobalSearchService } from '../services/global-search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu = ["Women", "Men", "Kids", "Shoes", "Brands"];
  globalSearchText = null;

  constructor(
    private globalSearchService: GlobalSearchService,
    private appService: AppService
  ) { }

  ngOnInit() {
    // this.getCustomers();
  }

  getCustomers() {
    
  }

  onGlobalSearch(event) {
    if (event.keyCode === 13) {
      // call global search
      this.globalSearchService.globalSearch(this.globalSearchText);    
    }
  }


}
