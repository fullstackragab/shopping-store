import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { productNewRelationshipData } from './product-new-relationship.data';

@Injectable({ providedIn: 'root' })
export class ProductNewService {
  getProductNew(productId: string): Observable<boolean> {
    const item = productNewRelationshipData.find(
      (item) => item.productId === productId
    );
    if (item) return Utils.getObservable<boolean>(item.value);
    else return Utils.getObservable<boolean>(false);
  }

  getProductsNew(
    data: string[]
  ): Observable<{ productId: string; value: boolean }[]> {
    const result: { productId: string; value: boolean }[] = [];
    data.forEach((productId) => {
      const item = productNewRelationshipData.find(
        (item) => item.productId === productId
      );
      if (item) result.push({ productId: item.productId, value: item.value });
      else result.push({ productId: productId, value: false });
    });
    return Utils.getObservable<{ productId: string; value: boolean }[]>(result);
  }
}
