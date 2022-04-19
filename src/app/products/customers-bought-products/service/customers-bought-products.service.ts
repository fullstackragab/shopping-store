import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { Product } from '../../service/product.model';
import { customersBoughtProductsData } from './customers-bought-products.data';

@Injectable({ providedIn: 'root' })
export class CustomersBoughtProductsService {
  getCustomersBoughtProducts(): Observable<Product[]> {
    return Utils.getObservable<Product[]>(customersBoughtProductsData.slice());
  }
}
