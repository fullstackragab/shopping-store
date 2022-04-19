import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/products/service/product.model';
import { Utils } from 'src/app/utils/utils';
import { popularProductsData } from './popular-products.data';

@Injectable({ providedIn: 'root' })
export class PopularProductsService {
  getPopularProducts(): Observable<Product[]> {
    return Utils.getObservable<Product[]>(popularProductsData.slice());
  }
}
