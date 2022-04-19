import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductFilterService } from '../service/product-filter.service';
import { ProductSortService } from '../service/product-sort.service';

@Component({
  selector: 'app-product-filter-dialog',
  templateUrl: './product-filter-dialog.component.html',
  styleUrls: ['./product-filter-dialog.component.css'],
})
export class ProductFilterDialogComponent implements OnInit {
  sortBy = 'best-seller';
  subscriptions: Subscription[] = [];

  constructor(
    private productFilterService: ProductFilterService,
    private productSortService: ProductSortService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.productSortService.sortByUpdated
        .pipe(tap((sortBy) => (this.sortBy = sortBy)))
        .subscribe()
    );
  }

  onSort() {
    this.productSortService.updateSortBy(this.sortBy).subscribe();
  }

  onReset() {
    this.productFilterService.resetFilters();
  }
}
