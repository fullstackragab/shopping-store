import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../utils/ui/service/loading.service';
import { TopInCategory } from './service/top-in-category.model';
import { TopInCategoryService } from './service/top-in-category.service';

@Component({
  selector: 'app-top-in-category',
  templateUrl: './top-in-category.component.html',
  styleUrls: ['./top-in-category.component.css'],
})
export class TopInCategoryComponent implements OnInit, OnDestroy {
  topInCategoryArray: TopInCategory[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private topInCategoryService: TopInCategoryService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.topInCategoryService.getTopInCategory().subscribe((data) => {
        this.topInCategoryArray = data;
        this.loadingService.endLoading('top-in-category');
      })
    );
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
