import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Utils } from 'src/app/utils/utils';
import { Cart } from '../service/cart.model';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cart!: Cart;
  cartItemsCount: string = '0';
  mobile: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private breakpointObserver: BreakpointObserver,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.cartService.cartUpdated
        .pipe(
          tap((cart) => {
            this.cartItemsCount = CartService.getItemsCount(cart.items);
            this.cart = cart;
          })
        )
        .subscribe()
    );

    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .pipe(
          tap((breakpoint) => {
            this.mobile =
              breakpoint.breakpoints[Breakpoints.XSmall] ||
              breakpoint.breakpoints[Breakpoints.Small];
          })
        )
        .subscribe()
    );
  }

  onAdd(productId: string, quantity: string) {
    const item = this.cart.items.find((item) => item.productId === productId);
    if (+quantity > 0) {
      this.cartService
        .addToCart(
          productId,
          item!.productName,
          item!.productImageUrl,
          item!.productListPrice,
          item!.productPriceAfterDiscount,
          item!.productDelivery,
          quantity
        )
        .pipe(
          catchError((error) => {
            this.snackbar.open(error, undefined, {
              verticalPosition: 'top',
              duration: 5000,
              panelClass: 'snackbar',
            });
            return new Observable<void>();
          })
        )
        .subscribe();
    }
  }

  onChange(productId: string, event: Event) {
    const quantity = (event.target as HTMLInputElement).value;
    if (+quantity > 0) {
      this.cartService
        .updateQuantity(productId, quantity)
        .pipe(
          catchError((error) => {
            this.snackbar.open(error, undefined, {
              verticalPosition: 'top',
              duration: 5000,
              panelClass: 'snackbar',
            });
            return new Observable<void>();
          })
        )
        .subscribe();
    }
  }

  onRemove(productId: string) {
    const item = this.cart.items.find((item) => item.productId === productId);
    if (+item!.quantity > 1) {
      this.cartService.removeFromCart(productId, '1').subscribe();
    }
  }

  onDelete(productId: string) {
    this.cartService.deleteItem(productId).subscribe();
  }

  getFriendlyName(productName: string) {
    return Utils.friendlyUrl(productName);
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) subscription.unsubscribe();
  }
}
