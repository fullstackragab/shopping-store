import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Category } from '../service/category.model';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  id: string = '';
  category!: Category;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((queryParams) => {
          this.id = queryParams['id'];
          return this.categoryService.getCategory(this.id);
        }),
        map((category) => {
          this.category = category;
        })
      )
      .subscribe();
  }
}
