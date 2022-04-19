import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { productReviewRelationshipData } from './product-review-relationship.data';
import { ProductReview } from './product-review.model';

@Injectable({ providedIn: 'root' })
export class ProductReviewService {
  getProductReviews(productId: string): Observable<ProductReview[]> {
    return Utils.getObservable<ProductReview[]>(
      productReviewRelationshipData.filter(
        (item) => item.productId === productId
      )
    );
  }
}
