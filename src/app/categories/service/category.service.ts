import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { categoriesData } from './categories.data';
import { categoryMainCategoryRelationshipData } from './category-main-category-relationship.data';
import { Category } from './category.model';
import { productCategoryRelationshipData } from './product-category-relationship.data';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  getCategories(mainCategoryId: string): Observable<Category[]> {
    const categories: Category[] = [];
    categoryMainCategoryRelationshipData
      .filter((item) => item.mainCategoryId === mainCategoryId)
      .forEach((item) => {
        const category = categoriesData.find(
          (category) => category.id === item.categoryId
        );
        if (category) categories.push(category);
      });
    return Utils.getObservable<Category[]>(categories);
  }
  getCategory(categoryId: string) {
    return Utils.getObservable<Category>(
      categoriesData.find((category) => category.id === categoryId)
    );
  }
  getCategoryProducts(categoryId: string): Observable<string[]> {
    return Utils.getObservable<string[]>(
      productCategoryRelationshipData
        .filter((item) => item.categoryId === categoryId)
        .map((item) => item.productId)
    );
  }
}
