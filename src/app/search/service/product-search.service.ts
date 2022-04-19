import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/products/service/product.model';
import { productsData } from 'src/app/products/service/products.data';
import { Utils } from 'src/app/utils/utils';

@Injectable({ providedIn: 'root' })
export class ProductSearchService {
  search(value: string): Observable<Product[]> {
    const result: Product[] = [];
    if (value && value.trim().length > 2) {
      const words: string[] = [];
      value.split(' ').forEach((word) => words.push(word.trim().toLowerCase()));
      productsData.forEach((product) => {
        words.forEach((word) => {
          if (
            product.name
              .split(' ')
              .join()
              .trim()
              .toLowerCase()
              .indexOf(word) !== -1 &&
            result.indexOf(product) === -1
          ) {
            result.push(product);
          }
        });
      });
    }
    return Utils.getObservable<Product[]>(result);
  }

  searchExact(value: string): Observable<Product[]> {
    const result: Product[] = [];
    if (value && value.trim().length > 2) {
      productsData.forEach((product) => {
        if (
          product.name.trim().toLowerCase() === value.trim().toLowerCase() &&
          result.indexOf(product) === -1
        )
          result.push(product);
      });
    }
    return Utils.getObservable<Product[]>(result);
  }
}
