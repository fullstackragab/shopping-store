import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { Product } from '../../service/product.model';
import { sponsoredProductsData } from './sponsored-products.data';

@Injectable({ providedIn: 'root' })
export class SponsoredProductsService {
  getSponsoredProducts(): Observable<Product[]> {
    return Utils.getObservable<Product[]>(sponsoredProductsData.slice());
  }
}
