import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { productStockRelationshipData } from './product-stock-relationship.data';

@Injectable({ providedIn: 'root' })
export class ProductStockService {
  getProductStock(productId: string): Observable<string> {
    const item = productStockRelationshipData.find(
      (item) => item.productId === productId
    );

    if (item) return Utils.getObservable<string>(item.value);
    else return Utils.getObservable<string>('0');
  }
}
