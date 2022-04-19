import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ProductDiscountService } from 'src/app/products/service/product-discount.service';
import { Product } from 'src/app/products/service/product.model';
import { ProductService } from 'src/app/products/service/product.service';
import { Utils } from 'src/app/utils/utils';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-item-added',
  templateUrl: './item-added.component.html',
  styleUrls: ['./item-added.component.css'],
})
export class ItemAddedComponent implements OnInit, OnDestroy {
  productId: string = '';
  product!: Product;
  quantity: string = '0';
  productPriceAfterDiscount: string = '0';
  cartItemsCount: string = '0';
  subtotal: string = '0';
  deliveryTotal: string = '0';
  total: string = '0';
  mobile: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private productDiscountService: ProductDiscountService,
    private cartService: CartService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params
        .pipe(
          switchMap((params) => {
            this.productId = params['id'];
            this.quantity = this.route.snapshot.queryParams['quantity'];
            this.cartItemsCount = this.route.snapshot.queryParams[
              'cartItemsCount'
            ];
            return this.productService.getProduct(this.productId);
          }),
          switchMap((product) => {
            this.product = product;
            return this.cartService.cartUpdated;
          }),
          switchMap((cart) => {
            this.subtotal = cart.subtotal;
            this.deliveryTotal = cart.deliveryTotal;
            this.total = cart.total;
            return this.productDiscountService.getProductDiscount(
              this.productId
            );
          }),
          tap((productDiscount) => {
            this.productPriceAfterDiscount = Utils.getPriceAfterDiscount(
              this.product.price,
              productDiscount
            );
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

  onBack() {
    this.router.navigate(['/product/' + this.getFriendlyName()], {
      queryParams: { id: this.productId },
    });
  }

  getFriendlyName() {
    return Utils.friendlyUrl(this.product.name);
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) subscription.unsubscribe();
  }
}
