import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { productRatingRelationshipData } from './product-rating-relationship.data';

@Injectable({ providedIn: 'root' })
export class ProductRatingService {
  getProductRating(
    productId: string
  ): Observable<{ rating: string; numberOfRatings: string }> {
    const item = productRatingRelationshipData.find(
      (item) => item.productId === productId
    );
    if (item)
      return Utils.getObservable<{ rating: string; numberOfRatings: string }>({
        rating: item.rating,
        numberOfRatings: item.numberOfRatings,
      });
    else
      return Utils.getObservable<{ rating: string; numberOfRatings: string }>({
        rating: '0',
        numberOfRatings: '0',
      });
  }

  getProductsRating(
    data: string[]
  ): Observable<{ productId: string; value: string }[]> {
    const result: { productId: string; value: string }[] = [];
    data.forEach((productId) => {
      const item = productRatingRelationshipData.find(
        (item) => item.productId === productId
      );
      if (item) result.push({ productId: item.productId, value: item.rating });
      else result.push({ productId: productId, value: '0' });
    });
    return Utils.getObservable<{ productId: string; value: string }[]>(result);
  }
}
