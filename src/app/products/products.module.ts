import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CustomersViewedProductsComponent } from './customers-viewed-products/customers-viewed-products.component';
import { CustomersBoughtProductsComponent } from './customers-bought-products/customers-bought-products.component';
import { SponsoredProductsComponent } from './sponsored-products/sponsored-products.component';

@NgModule({
  declarations: [
    ProductComponent,
    CustomersViewedProductsComponent,
    CustomersBoughtProductsComponent,
    SponsoredProductsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: ':name', component: ProductComponent }]),
    SharedModule,
  ],
})
export class ProductsModule {}
