import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductReviewComponent } from './add-product-review.component';

describe('AddProductReviewComponent', () => {
  let component: AddProductReviewComponent;
  let fixture: ComponentFixture<AddProductReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
