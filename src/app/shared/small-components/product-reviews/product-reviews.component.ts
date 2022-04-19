import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductReview } from 'src/app/products/service/product-review.model';
import { ProductReviewService } from 'src/app/products/service/product-review.service';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css'],
})
export class ProductReviewsComponent implements OnInit, OnDestroy {
  @Input() set productId(value: string) {
    this.subscriptions.push(
      this.productReviewService
        .getProductReviews(value)
        .subscribe((productReviews) => {
          this.productReviews = productReviews;
        })
    );
  }
  productReviews: ProductReview[] = [];
  subscriptions: Subscription[] = [];

  constructor(private productReviewService: ProductReviewService) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    for (let subscription of this.subscriptions) subscription.unsubscribe();
  }
}
