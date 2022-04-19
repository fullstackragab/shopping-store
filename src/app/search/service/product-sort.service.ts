import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ProductBestSellerService } from 'src/app/products/service/product-best-seller.service';
import { ProductDiscountService } from 'src/app/products/service/product-discount.service';
import { ProductNewService } from 'src/app/products/service/product-new.service';
import { ProductRatingService } from 'src/app/products/service/product-rating.service';
import { Product } from 'src/app/products/service/product.model';
import { Utils } from 'src/app/utils/utils';

@Injectable({ providedIn: 'root' })
export class ProductSortService {
  private sortBy: string = 'best-seller';

  sortByUpdated = new BehaviorSubject<string>(this.sortBy);

  constructor(
    private productBestSellerService: ProductBestSellerService,
    private productNewService: ProductNewService,
    private productDiscountService: ProductDiscountService,
    private productRatingService: ProductRatingService
  ) {}

  updateSortBy(sortBy: string): Observable<void> {
    this.sortBy = sortBy;
    this.sortByUpdated.next(sortBy);
    return new Observable<void>((observer) => observer.next());
  }

  sort(products: Product[]): Observable<Product[]> {
    console.log('sort: ', this.sortBy);
    switch (this.sortBy) {
      case 'best-seller':
        return this.sortByBestSeller(products);
      case 'new-arrival':
        return this.sortByNewArrival(products);
      case 'price-high-to-low':
        return this.sortByPriceHighToLow(products);
      case 'price-low-to-high':
        return this.sortByPriceLowToHigh(products);
      case 'rating':
        return this.sortByRating(products);
      default:
        return Utils.getObservable<Product[]>(products);
    }
  }

  private sortByBestSeller(products: Product[]): Observable<Product[]> {
    return this.productBestSellerService
      .getProductsBestSeller(products.map((product) => product.id))
      .pipe(
        first(),
        switchMap((productsBestSeller) => {
          const result: Product[] = products.sort((p1, p2) => {
            if (
              productsBestSeller.find((item) => item.productId === p1.id)!.value
            )
              return -1;
            else return 1;
          });
          return Utils.getObservable<Product[]>(result);
        })
      );
  }

  private sortByNewArrival(products: Product[]): Observable<Product[]> {
    return this.productNewService
      .getProductsNew(products.map((product) => product.id))
      .pipe(
        first(),
        switchMap((productsNew) => {
          const result: Product[] = products.sort((p1, p2) => {
            if (productsNew.find((item) => item.productId === p1.id)!.value)
              return -1;
            else return 1;
          });
          return Utils.getObservable<Product[]>(result);
        })
      );
  }

  private sortByPriceHighToLow(products: Product[]): Observable<Product[]> {
    return this.productDiscountService
      .getProductsDiscount(products.map((product) => product.id))
      .pipe(
        first(),
        switchMap((productsDiscount) => {
          const result: Product[] = products.sort((p1, p2) => {
            const price1 = Utils.getPriceAfterDiscount(
              p1.price,
              productsDiscount.find((item) => item.productId === p1.id)!.value
            );
            const price2 = Utils.getPriceAfterDiscount(
              p2.price,
              productsDiscount.find((item) => item.productId === p2.id)!.value
            );
            if (+price1 > +price2) return -1;
            else return 1;
          });
          return Utils.getObservable<Product[]>(result);
        })
      );
  }

  private sortByPriceLowToHigh(products: Product[]): Observable<Product[]> {
    return this.productDiscountService
      .getProductsDiscount(products.map((product) => product.id))
      .pipe(
        first(),
        switchMap((productsDiscount) => {
          const result: Product[] = products.sort((p1, p2) => {
            const price1 = Utils.getPriceAfterDiscount(
              p1.price,
              productsDiscount.find((item) => item.productId === p1.id)!.value
            );
            const price2 = Utils.getPriceAfterDiscount(
              p2.price,
              productsDiscount.find((item) => item.productId === p2.id)!.value
            );
            if (+price1 < +price2) return -1;
            else return 1;
          });
          return Utils.getObservable<Product[]>(result);
        })
      );
  }

  private sortByRating(products: Product[]): Observable<Product[]> {
    return this.productRatingService
      .getProductsRating(products.map((product) => product.id))
      .pipe(
        first(),
        switchMap((productsRating) => {
          const result: Product[] = products.sort((p1, p2) => {
            if (
              +productsRating.find((item) => item.productId === p1.id)!.value >
              +productsRating.find((item) => item.productId === p2.id)!.value
            )
              return -1;
            else return 1;
          });
          return Utils.getObservable<Product[]>(result);
        })
      );
  }
}
