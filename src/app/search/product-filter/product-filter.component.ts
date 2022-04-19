import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ProductFilter } from '../service/product-filter.model';
import { ProductFilterService } from '../service/product-filter.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  productFilter!: ProductFilter;
  subscriptions: Subscription[] = [];
  @Output() filter = new EventEmitter<void>();

  constructor(private productFilterService: ProductFilterService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.productFilterService
        .getProductFilter()
        .pipe(first())
        .subscribe((productFilter) => (this.productFilter = productFilter))
    );
    this.subscriptions.push(
      this.productFilterService.productFilterUpdated.subscribe(
        (productFilter) => (this.productFilter = productFilter)
      )
    );
  }

  onFilter() {
    this.productFilterService.updateFilter(this.productFilter);
    this.filter.next();
  }

  resetFilters() {
    this.productFilterService.resetFilters();
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) subscription.unsubscribe();
  }
}
