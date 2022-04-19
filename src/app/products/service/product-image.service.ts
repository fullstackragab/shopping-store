import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { productImagesRelationshipData } from './product-images-relationship.data';

@Injectable({ providedIn: 'root' })
export class ProductImagesService {
  getProductImages(productId: string): Observable<string[]> {
    return Utils.getObservable<string[]>(
      productImagesRelationshipData
        .filter((item) => item.productId === productId)
        .map((item) => item.imageUrl)
    );
  }
}
