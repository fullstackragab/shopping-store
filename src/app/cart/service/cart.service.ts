import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { ProductStockService } from 'src/app/products/service/product-stock.service';
import { CartItem } from './cart-item.model';
import { cartData } from './cart.data';
import { Cart } from './cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: Cart = cartData;

  cartUpdated = new BehaviorSubject<Cart>(this.cart);

  constructor(private productStockService: ProductStockService) {}

  static getItemsCount(items: CartItem[]): string {
    let count: string = '0';

    items.forEach((item) => {
      count = (+count + +item.quantity).toString();
    });

    return count;
  }

  addToCart(
    productId: string,
    productName: string,
    productImageUrl: string,
    productListPrice: string,
    productPriceAfterDiscount: string,
    productDelivery: string,
    quantity: string
  ): Observable<void> {
    return this.productStockService.getProductStock(productId).pipe(
      first(),
      tap((productStock) => {
        const item = this.cart.items.find(
          (item) => item.productId === productId
        );
        if (item) {
          if (+productStock >= +item.quantity + +quantity) {
            item.quantity = (+item.quantity + +quantity).toString();
            this.cart.subtotal = (
              +this.cart.subtotal +
              +item.productPriceAfterDiscount * +quantity
            ).toString();
            this.cart.total = (
              +this.cart.subtotal + +this.cart.deliveryTotal
            ).toString();
            this.cartUpdated.next(this.cart);
          } else {
            throw (
              'Only ' +
              productStock +
              (productStock === '1' ? ' item' : ' items') +
              ' available'
            );
          }
        } else {
          if (+productStock >= +quantity) {
            this.cart.items.push({
              productId: productId,
              productName: productName,
              productImageUrl: productImageUrl,
              productListPrice: productListPrice,
              productPriceAfterDiscount: productPriceAfterDiscount,
              productDelivery: productDelivery,
              quantity: quantity,
            });
            this.cart.subtotal = (
              +this.cart.subtotal +
              +productPriceAfterDiscount * +quantity
            ).toString();
            this.cart.deliveryTotal = (
              +this.cart.deliveryTotal + +productDelivery
            ).toString();
            this.cart.total = (
              +this.cart.subtotal + +this.cart.deliveryTotal
            ).toString();
            this.cartUpdated.next(this.cart);
          } else {
            throw (
              'Only ' +
              productStock +
              (productStock === '1' ? ' item' : ' items') +
              ' available'
            );
          }
        }
      }),
      switchMap(() => {
        console.log(this.cart);
        return new Observable<void>((observer) => observer.next());
      })
    );
  }

  removeFromCart(productId: string, quantity: string): Observable<void> {
    const item = this.cart.items.find((item) => item.productId === productId);
    if (item) {
      if (+item.quantity > +quantity) {
        item.quantity = (+item.quantity - +quantity).toString();
        this.cart.subtotal = (
          +this.cart.subtotal -
          +item.productPriceAfterDiscount * +quantity
        ).toString();
        this.cart.total = (
          +this.cart.total -
          +item.productPriceAfterDiscount * +quantity
        ).toString();
        this.cartUpdated.next(this.cart);
      } else {
        const index = this.cart.items.findIndex(
          (item) => item.productId === productId
        );
        this.cart.items.splice(index, 1);
        this.cart.subtotal = (
          +this.cart.subtotal -
          +item.productPriceAfterDiscount * +item.quantity
        ).toString();
        this.cart.deliveryTotal = (
          +this.cart.deliveryTotal - +item.productDelivery
        ).toString();
        this.cart.total = (
          +this.cart.subtotal + +this.cart.deliveryTotal
        ).toString();
        this.cartUpdated.next(this.cart);
      }
    }
    return new Observable<void>((observer) => observer.next());
  }

  updateQuantity(productId: string, quantity: string): Observable<void> {
    const item = this.cart.items.find((item) => item.productId === productId);
    if (item) {
      console.log(item.quantity, quantity);
      if (+item.quantity > +quantity) {
        return this.removeFromCart(
          productId,
          (+item.quantity - +quantity).toString()
        );
      } else if (+item.quantity < +quantity) {
        return this.addToCart(
          item.productId,
          item.productName,
          item.productImageUrl,
          item.productListPrice,
          item.productPriceAfterDiscount,
          item.productDelivery,
          (+quantity - +item.quantity).toString()
        );
      }
    }
    return new Observable<void>((observer) => observer.next());
  }

  deleteItem(productId: string): Observable<void> {
    const item = this.cart.items.find((item) => item.productId === productId);
    if (item) return this.removeFromCart(productId, item.quantity);
    else return new Observable<void>((observer) => observer.next());
  }
}
