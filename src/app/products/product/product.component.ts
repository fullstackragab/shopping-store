import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import {
  catchError,
  finalize,
  first,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { CartService } from 'src/app/cart/service/cart.service';
import { LoadingService } from 'src/app/utils/ui/service/loading.service';
import { Utils } from 'src/app/utils/utils';
import { ProductBestSellerService } from '../service/product-best-seller.service';
import { ProductDeliveryService } from '../service/product-delivery.service';
import { ProductDiscountService } from '../service/product-discount.service';
import { ProductImagesService } from '../service/product-image.service';
import { ProductNewService } from '../service/product-new.service';
import { ProductRatingService } from '../service/product-rating.service';
import { ProductStockService } from '../service/product-stock.service';
import { Product } from '../service/product.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  productId: string = '';
  product!: Product;
  productImages: string[] = [];
  information: { key: string; value: string }[] = [];
  mobile = false;
  subscriptions: Subscription[] = [];
  brand: string = '';
  stock: string = '0';
  delivery: string = '0';
  productBestSeller = false;
  productNew = false;
  discount: string = '0';
  rating: string = '0';
  numberOfRatings: string = '0';
  @ViewChild('mainImage') mainImage!: ElementRef;
  @ViewChildren('imgContainer') imgContainers!: QueryList<ElementRef>;
  priceAfterDiscount: string = '0';
  selectedQuantity: string = '1';

  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private productService: ProductService,
    private productImagesService: ProductImagesService,
    private productStockService: ProductStockService,
    private productDeliveryService: ProductDeliveryService,
    private productBestSellerService: ProductBestSellerService,
    private productNewService: ProductNewService,
    private productDiscountService: ProductDiscountService,
    private productRatingService: ProductRatingService,
    private renderer: Renderer2,
    private loadingService: LoadingService,
    private cartService: CartService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((queryParams) => {
          this.productId = queryParams['id'];
          return this.productService.getProduct(this.productId);
        }),
        switchMap((product) => {
          this.product = product;
          this.information = ProductService.getProductInformation(
            product.information
          );
          this.brand = ProductService.getProductBrand(this.information);
          return this.productImagesService.getProductImages(this.productId);
        }),
        switchMap((productImages) => {
          this.productImages = productImages;
          return this.productStockService.getProductStock(this.productId);
        }),
        switchMap((productStock) => {
          this.stock = productStock;
          this.selectedQuantity = '1';
          return this.productDeliveryService.getProductDelivery(this.productId);
        }),
        switchMap((productDelivery) => {
          this.delivery = productDelivery;
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
          return this.productDiscountService.getProductDiscount(this.productId);
        }),
        switchMap((productDiscount) => {
          this.discount = productDiscount;
          this.priceAfterDiscount = Utils.getPriceAfterDiscount(
            this.product.price,
            productDiscount
          ).toString();
          return this.productRatingService.getProductRating(this.productId);
        }),
        map((productRating) => {
          this.rating = productRating.rating;
          this.numberOfRatings = productRating.numberOfRatings;
          this.loadingService.endLoading('product');
        })
      )
      .subscribe();

    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .subscribe((breakpoint) => {
          this.mobile =
            breakpoint.breakpoints[Breakpoints.XSmall] ||
            breakpoint.breakpoints[Breakpoints.Small];
        })
    );
  }

  addToCart() {
    let cartItemsCount: string = '0';
    this.subscriptions.push(
      this.cartService.cartUpdated
        .pipe(
          first(),
          switchMap((cart) => {
            cartItemsCount = CartService.getItemsCount(cart.items);
            return this.cartService.addToCart(
              this.productId,
              this.product.name,
              this.product.imageUrl,
              this.product.price,
              this.priceAfterDiscount,
              this.delivery,
              this.selectedQuantity
            );
          }),
          tap((data) => {
            this.router.navigate(['/cart/item-added/' + this.productId], {
              queryParams: {
                quantity: this.selectedQuantity,
                cartItemsCount: cartItemsCount,
              },
            });
            return of();
          }),
          catchError((error) => {
            this.snackbar.open(error, undefined, {
              verticalPosition: 'top',
              duration: 5000,
              panelClass: 'snackbar',
            });
            return new Observable<void>();
          })
        )
        .subscribe()
    );
  }

  get count() {
    return Array.from(Array(+this.stock + 1).keys()).slice(1);
  }

  onImageClick(index: number, productImage: string) {
    if (this.mainImage) {
      (this.mainImage.nativeElement as HTMLImageElement).src = productImage;
      let count = 0;
      this.imgContainers.forEach((item) => {
        if (count === index) {
          this.renderer.setStyle(
            this.imgContainers.get(count)?.nativeElement,
            'opacity',
            '1'
          );
        } else {
          this.renderer.setStyle(
            this.imgContainers.get(count)?.nativeElement,
            'opacity',
            '0.8'
          );
        }
        count++;
      });
    }
  }

  ngOnDestroy() {
    for (let subscriptionn of this.subscriptions) subscriptionn.unsubscribe();
  }
}
