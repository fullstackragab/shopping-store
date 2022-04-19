import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { MainCategory } from '../service/main-category.model';
import { MainCategoryService } from '../service/main-category.service';

@Component({
  selector: 'app-all-main-categories',
  templateUrl: './all-main-categories.component.html',
  styleUrls: ['./all-main-categories.component.css'],
})
export class AllMainCategoriesComponent implements OnInit, OnDestroy {
  mainCategories: MainCategory[] = [];
  subscriptions: Subscription[] = [];

  constructor(private mainCategoryService: MainCategoryService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.mainCategoryService
        .getMainCategories()
        .subscribe((mainCategories) => {
          this.mainCategories = mainCategories;
        })
    );
  }

  getFriendlyName(value: string) {
    return Utils.friendlyUrl(value);
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) subscription.unsubscribe();
  }
}
