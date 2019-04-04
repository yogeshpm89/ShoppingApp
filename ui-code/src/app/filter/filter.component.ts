import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { AppService } from '../services/app.service';
import { Department } from '../models/department';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  categories: Category[] = [];
  selectedCategories: Category[] = [];

  departments: Department[] = [];
  selectedDepartments: Department[] = [];

  selectedColor = null;
  colors = ['blue', 'red', 'orange', 'green', 'light-green'];
  sizes = ['XS', 'S', 'M', 'L', 'XL'];

  minPrice = 0;
  maxPrice = 100;

  minPriceStart = 0;
  minPriceEnd = 100;

  maxPriceStart = 0;
  maxPriceEnd = 100;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.minPriceEnd = this.maxPrice;
    this.getDepartments();
    this.getCategories();
  }


  getDepartments() {
    this.appService.getDepartments().subscribe(
      response => {
        this.departments = <Department[]>response;
        for (let i=0; i<this.departments.length; i++) {
          this.selectedDepartments[i] = false;
        }
      }
    )
  }

  getCategories() {
    this.appService.getCategories().subscribe(
      response => {
        this.categories = response['rows'];
        for (let i=0; i<this.categories.length; i++) {
          this.selectedCategories[i] = false;
        }
      }
    )
  }

  changeMinPrice() {
    // if (this.minPrice > this.maxPrice) return false;
    this.maxPriceStart = this.minPrice;
    if (this.maxPrice < this.minPrice) this.maxPrice = this.maxPriceEnd;
  }

  changeMaxPrice() {
    if (this.maxPrice < this.minPrice) return false;
  }

}
