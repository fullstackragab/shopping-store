import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductBestSellerService } from 'src/app/products/service/product-best-seller.service';
import { ProductDeliveryService } from 'src/app/products/service/product-delivery.service';
import { ProductDiscountService } from 'src/app/products/service/product-discount.service';
import { ProductNewService } from 'src/app/products/service/product-new.service';
import { ProductRatingService } from 'src/app/products/service/product-rating.service';
import { ProductStockService } from 'src/app/products/service/product-stock.service';
import { Product } from 'src/app/products/service/product.model';
import { ProductService } from 'src/app/products/service/product.service';
import { LoadingService } from 'src/app/utils/ui/service/loading.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css'],
})
export class ProductListItemComponent implements OnInit, OnDestroy {
  @Input() productId: string = '';
  product!: Product;
  productBestSeller: boolean = false;
  productNew: boolean = false;
  rating: string = '0';
  numberOfRatings: string = '0';
  productStock: string = '0';
  productDelivery: string = '0';
  productDiscount: string = '0';
  priceAfterDiscount: string = '0';
  mobile: boolean = false;
  susbcriptions: Subscription[] = [];

  constructor(
    private productService: ProductService,
    private productBestSellerService: ProductBestSellerService,
    private productNewService: ProductNewService,
    private productRatingService: ProductRatingService,
    private productStockService: ProductStockService,
    private productDeliveryService: ProductDeliveryService,
    private productDiscountService: ProductDiscountService,
    private breakpointObserver: BreakpointObserver,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.productId !== '') {
      this.susbcriptions.push(
        this.productService
          .getProduct(this.productId)
          .pipe(
            switchMap((product) => {
              this.product = product;
              return this.productBestSellerService.getProductBestSeller(
                this.productId
              );
            }),
            switchMap((productBestSeller) => {
              this.productBestSeller = productBestSeller;
              return this.productNewService.getProductNew(this.productId);
            }),
            switchMap((productNew) => {
              this.productNew = productNew;
              return this.productRatingService.getProductRating(this.productId);
            }),
            switchMap((productRating) => {
              this.rating = productRating.rating;
              this.numberOfRatings = productRating.numberOfRatings;
              return this.productStockService.getProductStock(this.productId);
            }),
            switchMap((productStock) => {
              this.productStock = productStock;
              return this.productDeliveryService.getProductDelivery(
                this.productId
              );
            }),
            switchMap((productDelivery) => {
              this.productDelivery = productDelivery;
              return this.productDiscountService.getProductDiscount(
                this.productId
              );
            }),
            map((productDiscount) => {
              this.productDiscount = productDiscount;
              this.priceAfterDiscount = Utils.getPriceAfterDiscount(
                this.product.price,
                productDiscount
              );
            })
          )
          .subscribe()
      );

      this.susbcriptions.push(
        this.breakpointObserver
          .observe([Breakpoints.XSmall, Breakpoints.Small])
          .subscribe((breakpoint) => {
            this.mobile =
              breakpoint.breakpoints[Breakpoints.XSmall] ||
              breakpoint.breakpoints[Breakpoints.Small];
          })
      );
    }
  }

  onClick() {
    this.loadingService.startLoading('product');
    this.router.navigate(['/product/' + this.product.name], {
      queryParams: { id: this.product.id },
    });
  }

  ngOnDestroy() {
    for (let susbcription of this.susbcriptions) susbcription.unsubscribe();
  }
}
