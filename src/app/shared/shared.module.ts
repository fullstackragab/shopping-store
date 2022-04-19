import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductRatingComponent } from './small-components/product-rating/product-rating.component';
import { ProductBestSellerComponent } from './small-components/product-best-seller/product-best-seller.component';
import { ProductNewComponent } from './small-components/product-new/product-new.component';
import { ProductStockComponent } from './small-components/product-stock/product-stock.component';
import { ProductDiscountComponent } from './small-components/product-discount/product-discount.component';
import { ProductPriceComponent } from './small-components/product-price/product-price.component';
import { LimitPipe } from './limit.pipe';
import { ProductReviewsComponent } from './small-components/product-reviews/product-reviews.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';

@NgModule({
  declarations: [
    ProductRatingComponent,
    ProductBestSellerComponent,
    ProductNewComponent,
    ProductStockComponent,
    ProductDiscountComponent,
    ProductPriceComponent,
    LimitPipe,
    ProductReviewsComponent,
    ProductCardComponent,
    ProductListItemComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
  exports: [
    ProductRatingComponent,
    ProductBestSellerComponent,
    ProductNewComponent,
    ProductStockComponent,
    ProductDiscountComponent,
    ProductPriceComponent,
    LimitPipe,
    ProductReviewsComponent,
    ProductCardComponent,
    ProductListItemComponent,
  ],
})
export class SharedModule {}
