import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../service/product.model';
import { SponsoredProductsService } from './service/sponsored-products.service';

@Component({
  selector: 'app-sponsored-products',
  templateUrl: './sponsored-products.component.html',
  styleUrls: ['./sponsored-products.component.css'],
})
export class SponsoredProductsComponent implements OnInit, OnDestroy {
  sponsoredProducts: Product[] = [];
  subscriptions: Subscription[] = [];

  constructor(private sponsoredProductsService: SponsoredProductsService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.sponsoredProductsService
        .getSponsoredProducts()
        .subscribe((sponsoredProducts) => {
          this.sponsoredProducts = sponsoredProducts;
        })
    );
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) subscription.unsubscribe();
  }
}
