import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { topInCategoryData } from './top-in-category.data';
import { TopInCategory } from './top-in-category.model';

@Injectable({ providedIn: 'root' })
export class TopInCategoryService {
  getTopInCategory(): Observable<TopInCategory[]> {
    return Utils.getObservable<TopInCategory[]>(topInCategoryData.slice());
  }
}
