import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { mainCategoriesData } from './main-categories.data';
import { MainCategory } from './main-category.model';

@Injectable({ providedIn: 'root' })
export class MainCategoryService {
  getMainCategories(): Observable<MainCategory[]> {
    return Utils.getObservable<MainCategory[]>(mainCategoriesData.slice());
  }

  getMainCategory(mainCategoryId: string): Observable<MainCategory> {
    return Utils.getObservable<MainCategory>(
      mainCategoriesData.find((item) => {
        return item.id === mainCategoryId;
      })
    );
  }
}
