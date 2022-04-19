import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: ':name', component: CategoryComponent }]),
  ],
})
export class CategoriesModule {}
