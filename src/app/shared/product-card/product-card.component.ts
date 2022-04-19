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
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() productId: string = '';
  product!: Product;
  productBestSeller = false;
  productNew = false;
  rating: string = '0';
  numberOfRatings: string = '0';
  productDelivery: string = '0';
  productStock: string = '0';
  subscriptions: Subscription[] = [];
  productDiscount: string = '0';
  priceAfterDiscount: string = '0';

  constructor(
    private productService: ProductService,
    private productBestSellerService: ProductBestSellerService,
    private productNewService: ProductNewService,
    private productRatingService: ProductRatingService,
    private productDeliveryService: ProductDeliveryService,
    private productStockService: ProductStockService,
    private productDiscountService: ProductDiscountService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.productId !== '') {
      this.subscriptions.push(
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
              return this.productDeliveryService.getProductDelivery(
                this.productId
              );
            }),
            switchMap((productDelivery) => {
              this.productDelivery = productDelivery;
              return this.productStockService.getProductStock(this.productId);
            }),
            switchMap((productStock) => {
              this.productStock = productStock;
              return this.productDiscountService.getProductDiscount(
                this.productId
              );
            }),
            map((productDiscount) => {
              this.productDiscount = productDiscount;
              this.priceAfterDiscount = Utils.getPriceAfterDiscount(
                this.product.price,
                productDiscount
              ).toString();
            })
          )
          .subscribe()
      );
    }
  }

  onClick() {
    this.loadingService.startLoading('product');
    this.router.navigate(['/product/' + Utils.friendlyUrl(this.product.name)], {
      queryParams: { id: this.product.id },
    });
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) subscription.unsubscribe();
  }
}
