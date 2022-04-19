import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductFilterDialogComponent } from './product-filter-dialog/product-filter-dialog.component';

@NgModule({
  declarations: [
    ProductSearchComponent,
    ProductFilterComponent,
    ProductFilterDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: ':value', component: ProductSearchComponent },
    ]),
  ],
})
export class SearchModule {}
