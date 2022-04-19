import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { Product } from 'src/app/products/service/product.model';
import { ProductSearchService } from '../service/product-search.service';
import { ProductSortService } from '../service/product-sort.service';
import { ProductFilterDialogComponent } from '../product-filter-dialog/product-filter-dialog.component';
import { ProductFilterService } from '../service/product-filter.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  value: string = '';
  exact: boolean = false;
  products: Product[] = [];
  displayMode: 'list' | 'grid' = 'list';
  sortBy: string = 'best-seller';
  mobile: boolean = false;
  subscriptions: Subscription[] = [];
  dialogRef!: MatDialogRef<ProductFilterDialogComponent>;

  constructor(
    private route: ActivatedRoute,
    private productSearchService: ProductSearchService,
    private breakpointObserver: BreakpointObserver,
    private productSortService: ProductSortService,
    private productFilterService: ProductFilterService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([this.route.params, this.route.queryParams]).subscribe(
        ([params, queryParams]) => {
          this.value = params['value'];
          this.exact = queryParams['exact'] === 'true';
          this.search();
        }
      )
    );

    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .subscribe((breakpoint) => {
          this.mobile =
            breakpoint.breakpoints[Breakpoints.XSmall] ||
            breakpoint.breakpoints[Breakpoints.Small];
          if (this.dialogRef) this.dialogRef.close();
        })
    );

    this.subscriptions.push(
      this.productSortService.sortByUpdated
        .pipe(tap((sortBy) => (this.sortBy = sortBy)))
        .subscribe()
    );
  }

  onSort() {
    this.productSortService
      .updateSortBy(this.sortBy)
      .pipe(
        switchMap(() => {
          return this.productSortService.sort(this.products);
        })
      )
      .subscribe();
  }

  search() {
    if (this.exact) {
      this.productSearchService
        .searchExact(this.value)
        .pipe(first())
        .subscribe((products) => {
          this.products = products;
          this.onSort();
          this.productFilterService.buildFilters(products);
        });
    } else {
      this.productSearchService
        .search(this.value)
        .pipe(first())
        .subscribe((products) => {
          this.products = products;
          this.onSort();
          this.productFilterService.buildFilters(products);
        });
    }
  }

  onFilter() {
    this.subscriptions.push(
      this.productSearchService
        .search(this.value)
        .pipe(
          switchMap((products) => {
            return this.productFilterService.filter(products);
          }),
          first(),
          map((products) => (this.products = products))
        )
        .subscribe()
    );
  }

  onFilterDialog() {
    this.dialogRef = this.matDialog.open(ProductFilterDialogComponent, {
      height: '100%',
      width: '100%',
    });
    this.dialogRef
      .afterClosed()
      .pipe(
        first(),
        switchMap(() => {
          return this.productSortService.sort(this.products);
        }),
        switchMap((products) => {
          return this.productFilterService.filter(products);
        }),
        tap((products) => (this.products = products))
      )
      .subscribe();
  }

  ngOnDestroy() {
    for (let susbcription of this.subscriptions) susbcription.unsubscribe();
  }
}
