import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { Product } from './product.model';
import { productsData } from './products.data';

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProduct(productId: string): Observable<Product> {
    return Utils.getObservable<Product>(
      productsData.find((product) => product.id === productId)
    );
  }
  static getProductInformation(value: string): { key: string; value: string }[] {
    try {
      return JSON.parse(value) as { key: string; value: string }[];
    } catch {}
    return [];
  }
  static getProductBrand(information: { key: string; value: string }[]): string {
    const item = information.find(
      (item) => item.key.trim().toLowerCase() === 'manufacturer'
    );
    if (item) return item.value;
    return '';
  }
}
