import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Category } from '../categories/service/category.model';
import { CategoryService } from '../categories/service/category.service';
import { MainCategory } from '../main-categories/service/main-category.model';
import { MainCategoryService } from '../main-categories/service/main-category.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  mainCategories: MainCategory[] = [];
  mainCategory: MainCategory | null = null;
  categories: Category[] = [];

  @Output() sidenavClose = new EventEmitter<void>();

  constructor(
    private mainCategoryService: MainCategoryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.mainCategoryService
        .getMainCategories()
        .subscribe((mainCategories) => {
          this.mainCategories = mainCategories;
        })
    );
  }

  onMainCategory(mainCategory: MainCategory) {
    this.mainCategory = mainCategory;
    this.categoryService
      .getCategories(mainCategory.id)
      .pipe(first())
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  onLogout() {
    this.onClose();
  }

  onClose() {
    this.mainCategory = null;
    this.sidenavClose.emit();
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
