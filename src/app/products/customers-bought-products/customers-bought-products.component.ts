import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../service/product.model';
import { CustomersBoughtProductsService } from './service/customers-bought-products.service';

@Component({
  selector: 'app-customers-bought-products',
  templateUrl: './customers-bought-products.component.html',
  styleUrls: ['./customers-bought-products.component.css'],
})
export class CustomersBoughtProductsComponent implements OnInit {
  customersBoughtProducts: Product[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private customersBoughtProductsService: CustomersBoughtProductsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.customersBoughtProductsService
        .getCustomersBoughtProducts()
        .subscribe((customersBoughtProducts) => {
          this.customersBoughtProducts = customersBoughtProducts;
        })
    );
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) subscription.unsubscribe();
  }
}
