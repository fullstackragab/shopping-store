import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { productDiscountRelationshipData } from './product-discount-relationship.data';

@Injectable({ providedIn: 'root' })
export class ProductDiscountService {
  getProductDiscount(productId: string): Observable<string> {
    const item = productDiscountRelationshipData.find(
      (item) => item.productId === productId
    );
    if (item) return Utils.getObservable<string>(item.value);
    else return Utils.getObservable<string>('0');
  }

  getProductsDiscount(
    data: string[]
  ): Observable<{ productId: string; value: string }[]> {
    const result: { productId: string; value: string }[] = [];
    data.forEach((productId) => {
      const item = productDiscountRelationshipData.find(
        (item) => item.productId === productId
      );
      if (item) result.push({ productId: item.productId, value: item.value });
      else result.push({ productId: productId, value: '0' });
    });
    return Utils.getObservable<{ productId: string; value: string }[]>(result);
  }
}
