import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../products/service/product.model';
import { PopularProductsService } from './service/popular-products.service';

@Component({
  selector: 'app-home-popular-products',
  templateUrl: './home-popular-products.component.html',
  styleUrls: ['./home-popular-products.component.css'],
})
export class HomePopularProductsComponent implements OnInit, OnDestroy {
  popularProducts: Product[] = [];
  subscriptions: Subscription[] = [];

  constructor(private popularProductsService: PopularProductsService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.popularProductsService
        .getPopularProducts()
        .subscribe((popularProducts) => {
          this.popularProducts = popularProducts;
        })
    );
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) subscription.unsubscribe();
  }
}
