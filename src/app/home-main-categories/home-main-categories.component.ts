import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainCategory } from '../main-categories/service/main-category.model';
import { MainCategoryService } from '../main-categories/service/main-category.service';
import { LoadingService } from '../utils/ui/service/loading.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-home-main-categories',
  templateUrl: './home-main-categories.component.html',
  styleUrls: ['./home-main-categories.component.css'],
})
export class HomeMainCategoriesComponent implements OnInit, OnDestroy {
  constructor(
    private mainCategoryService: MainCategoryService,
    private loadingService: LoadingService
  ) {}

  mainCategories: MainCategory[] = [];

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
      this.subscriptions.push(
      this.mainCategoryService
        .getMainCategories()
        .subscribe((mainCategories) => {
          this.mainCategories = mainCategories.slice(0, 4);
          this.loadingService.endLoading('home-main-categories');
        })
    );
  }

  getFriendlyName(value: string) {
    return Utils.friendlyUrl(value);
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
