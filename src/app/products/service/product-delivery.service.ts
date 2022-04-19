import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { productDeliveryRelationshipData } from './product-delivery-relationship.data';

@Injectable({ providedIn: 'root' })
export class ProductDeliveryService {
  getProductDelivery(productId: string): Observable<string> {
    const item = productDeliveryRelationshipData.find(
      (item) => item.productId === productId
    );
    if (item) return Utils.getObservable<string>(item.value);
    else return Utils.getObservable<string>('0');
  }
}
