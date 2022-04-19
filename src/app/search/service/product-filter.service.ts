import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/products/service/product.model';
import { ProductService } from 'src/app/products/service/product.service';
import { productsData } from 'src/app/products/service/products.data';
import { Utils } from 'src/app/utils/utils';
import { ProductFilter } from './product-filter.model';

@Injectable({ providedIn: 'root' })
export class ProductFilterService {
  private productFilter: ProductFilter = {
    brands: [],
    prices: [],
    colors: [],
    conditions: [],
  };

  constructor() {
    this.buildFilters(productsData.slice());
  }

  productFilterUpdated = new BehaviorSubject<ProductFilter>(this.productFilter);

  updateFilter(productFilter: ProductFilter) {
    this.productFilter = productFilter;
    this.productFilterUpdated.next(productFilter);
  }

  getProductFilter(): Observable<ProductFilter> {
    return Utils.getObservable<ProductFilter>(this.productFilter);
  }

  resetFilters() {
    this.productFilter.brands.forEach((item) => (item.checked = false));
    this.productFilter.prices.forEach((item) => (item.checked = false));
    this.productFilter.colors.forEach((item) => (item.checked = false));
    this.productFilter.conditions.forEach((item) => (item.checked = false));
  }

  anyFilterSelected(): boolean {
    for (let brand of this.productFilter.brands) if (brand.checked) return true;
    for (let price of this.productFilter.prices) if (price.checked) return true;
    for (let color of this.productFilter.colors) if (color.checked) return true;
    for (let condition of this.productFilter.conditions)
      if (condition.checked) return true;
    return false;
  }

  buildFilters(products: Product[]) {
    this.buildBrands(products);
    this.buildPrices();
    this.buildColors(products);
    this.buildConditions(products);
    this.productFilterUpdated.next(this.productFilter);
  }

  filter(products: Product[]): Observable<Product[]> {
    const result: Product[] = [];
    if (this.anyFilterSelected()) {
      products.forEach((product) => {
        const productInformation = ProductService.getProductInformation(
          product.information
        );

        this.productFilter.brands.forEach((brand) => {
          if (
            brand.checked &&
            productInformation.findIndex(
              (item) =>
                item.key.trim().toLowerCase() === 'brand' &&
                item.value === brand.name
            ) !== -1
          )
            if (result.indexOf(product) === -1) result.push(product);
        });
        this.productFilter.prices.forEach((price) => {
          let min = 0;
          let max = 0;
          if (price.name.indexOf('-') !== -1) {
            min = +price.name.split('-')[0];
            max = +price.name.split('-')[1];
            if (price.checked && +product.price >= min && +product.price <= max)
              if (result.indexOf(product) === -1) result.push(product);
          } else if (price.name.indexOf('+') !== -1) {
            min = +price.name.substring(0, price.name.indexOf('+'));
            if (price.checked && +product.price >= min)
              if (result.indexOf(product) === -1) result.push(product);
          }
        });
        this.productFilter.colors.forEach((color) => {
          if (
            color.checked &&
            productInformation.findIndex(
              (item) =>
                item.key.trim().toLowerCase() === 'color' &&
                item.value === color.name
            ) !== -1
          )
            if (result.indexOf(product) === -1) result.push(product);
        });
        this.productFilter.conditions.forEach((condition) => {
          if (
            condition.checked &&
            productInformation.findIndex(
              (item) =>
                item.key.trim().toLowerCase() === 'condition' &&
                item.value === condition.name
            ) !== -1
          )
            if (result.indexOf(product) === -1) result.push(product);
        });
      });
      return Utils.getObservable<Product[]>(result);
    } else {
      return Utils.getObservable<Product[]>(products);
    }
  }

  buildBrands(products: Product[]) {
    this.productFilter.brands = [];
    products.forEach((product) => {
      const data = ProductService.getProductInformation(product.information);
      data.forEach((item) => {
        if (
          item.key.trim().toLowerCase() === 'brand' &&
          this.productFilter.brands.findIndex(
            (value) => value.name === item.value
          ) === -1
        ) {
          this.productFilter.brands.push({ name: item.value, checked: false });
        }
      });
    });
  }

  buildPrices() {
    this.productFilter.prices = [];
    const prices: string[] = [
      '0 - 100',
      '100 - 500',
      '500 - 1000',
      '1000 - 2000',
      '2000+',
    ];
    prices.forEach((item) =>
      this.productFilter.prices.push({ name: item, checked: false })
    );
  }

  buildColors(products: Product[]) {
    this.productFilter.colors = [];
    products.forEach((product) => {
      const data = ProductService.getProductInformation(product.information);
      data.forEach((item) => {
        if (
          item.key.trim().toLowerCase() === 'color' &&
          this.productFilter.colors.findIndex(
            (value) => value.name === item.value
          ) === -1
        ) {
          this.productFilter.colors.push({ name: item.value, checked: false });
        }
      });
    });
  }

  buildConditions(products: Product[]) {
    this.productFilter.conditions = [];
    products.forEach((product) => {
      const data = ProductService.getProductInformation(product.information);
      data.forEach((item) => {
        if (
          item.key.trim().toLowerCase() === 'condition' &&
          this.productFilter.conditions.findIndex(
            (value) => value.name === item.value
          ) === -1
        ) {
          this.productFilter.conditions.push({
            name: item.value,
            checked: false,
          });
        }
      });
    });
  }
}
