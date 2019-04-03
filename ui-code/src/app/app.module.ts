import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientXsrfModule, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { FilterComponent } from './filter/filter.component';
import { ProductListComponent } from './product-list/product-list.component';
import { Interceptor } from './http/interceptor';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailCardComponent } from './product-detail-card/product-detail-card.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';
import { AddProductReviewComponent } from './add-product-review/add-product-review.component';
import { ProductDetailImagesComponent } from './product-detail-images/product-detail-images.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    FilterComponent,
    ProductListComponent,
    ProductCardComponent,
    ProductDetailComponent,
    ProductDetailCardComponent,
    ProductReviewsComponent,
    AddProductReviewComponent,
    ProductDetailImagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'App-Xsrf-Cookie',
      headerName: 'App-Xsrf-Header'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
