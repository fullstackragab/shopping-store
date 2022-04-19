import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { Product } from '../../service/product.model';
import { customersViewedProductsData } from './customers-viewed-products.data';

@Injectable({ providedIn: 'root' })
export class CustomersViewedProductsService {
  getCustomersViewedProducts(): Observable<Product[]> {
    return Utils.getObservable<Product[]>(customersViewedProductsData.slice());
  }
}
