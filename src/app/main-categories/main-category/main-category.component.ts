import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Category } from 'src/app/categories/service/category.model';
import { CategoryService } from 'src/app/categories/service/category.service';
import { Utils } from 'src/app/utils/utils';
import { MainCategory } from '../service/main-category.model';
import { MainCategoryService } from '../service/main-category.service';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.css'],
})
export class MainCategoryComponent implements OnInit {
  id: string = '';
  mainCategory!: MainCategory;
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private mainCategoryService: MainCategoryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((queryParams) => {
          this.id = queryParams['id'];
          return this.mainCategoryService.getMainCategory(this.id);
        }),

        switchMap((mainCategory) => {
          this.mainCategory = mainCategory;
          return this.categoryService.getCategories(this.id);
        }),

        map((categories) => {
          this.categories = categories;
        })
      )
      .subscribe();
  }

  getFriendlyName(value: string) {
    return Utils.friendlyUrl(value);
  }
}
