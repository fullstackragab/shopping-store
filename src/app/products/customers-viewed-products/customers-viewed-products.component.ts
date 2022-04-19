import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../service/product.model';
import { CustomersViewedProductsService } from './service/customers-viewed-products.service';

@Component({
  selector: 'app-customers-viewed-products',
  templateUrl: './customers-viewed-products.component.html',
  styleUrls: ['./customers-viewed-products.component.css'],
})
export class CustomersViewedProductsComponent implements OnInit, OnDestroy {
  customersViewedProducts: Product[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private customersViewedProductsService: CustomersViewedProductsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.customersViewedProductsService
        .getCustomersViewedProducts()
        .subscribe((customersViewedProducts) => {
          this.customersViewedProducts = customersViewedProducts;
        })
    );
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) subscription.unsubscribe();
  }
}
