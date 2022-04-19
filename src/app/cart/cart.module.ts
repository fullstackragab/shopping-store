import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemAddedComponent } from './item-added/item-added.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [ItemAddedComponent, CartComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([
      { path: 'item-added/:id', component: ItemAddedComponent },
      { path: '', component: CartComponent },
    ]),
  ],
})
export class CartModule {}
