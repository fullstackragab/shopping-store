import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AllMainCategoriesComponent } from './all-main-categories/all-main-categories.component';
import { MainCategoryComponent } from './main-category/main-category.component';

@NgModule({
  declarations: [AllMainCategoriesComponent, MainCategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'all', component: AllMainCategoriesComponent },
      { path: ':name', component: MainCategoryComponent },
    ]),
  ],
})
export class MainCategoriesModule {}
