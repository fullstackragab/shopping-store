import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadingService } from '../utils/ui/service/loading.service';
import { Sale } from './service/sale.model';
import { SaleService } from './service/sale.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  sales: Sale[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private saleService: SaleService,
    private loadingService: LoadingService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver
        .observe(Breakpoints.Small)
        .pipe(
          switchMap((breakpoint) => {
            if (breakpoint.matches) return this.saleService.getSales('small');
            else return this.saleService.getSales('large');
          })
        )
        .subscribe((sales) => {
          this.sales = sales;
          this.loadingService.endLoading('sales');
        })
    );
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
