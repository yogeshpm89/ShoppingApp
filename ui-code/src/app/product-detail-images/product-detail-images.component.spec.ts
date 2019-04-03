import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailImagesComponent } from './product-detail-images.component';

describe('ProductDetailImagesComponent', () => {
  let component: ProductDetailImagesComponent;
  let fixture: ComponentFixture<ProductDetailImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
