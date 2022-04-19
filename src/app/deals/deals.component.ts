import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadingService } from '../utils/ui/service/loading.service';
import { Deal } from './service/deal.model';
import { DealService } from './service/deal.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css'],
})
export class DealsComponent implements OnInit, OnDestroy {
  deals: Deal[] = [];
  sliderSubscription!: Subscription;
  pauseSubscription!: Subscription;
  left = 0;
  @ViewChild('slides') slidesElRef!: ElementRef;
  subscriptions: Subscription[] = [];

  @ViewChildren('img') images!: QueryList<ElementRef>;
  constructor(
    private dealService: DealService,
    private renderer: Renderer2,
    private loadingService: LoadingService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .pipe(
          switchMap((breakpoint) => {
            if (
              breakpoint.breakpoints[Breakpoints.XSmall] ||
              breakpoint.breakpoints[Breakpoints.Small]
            )
              return this.dealService.getDeals('small');
            else return this.dealService.getDeals('large');
          })
        )
        .subscribe((deals) => {
          this.deals = deals;
          for (let deal of deals) {
          }
          this.slide();
          this.loadingService.endLoading('deals');
        })
    );
  }

  slide() {
    if (this.sliderSubscription) {
      this.sliderSubscription.unsubscribe();
    }
    this.sliderSubscription = interval(100000).subscribe(() => {
      if (this.deals.length > 0) {
        const value = window.innerWidth;
        this.left -= value;
        if (this.left <= -(value * this.deals.length)) {
          this.left = 0;
        }
        this.updateSlide();
      }
    });
  }

  updateSlide() {
    if (this.slidesElRef) {
      this.renderer.setStyle(
        this.slidesElRef.nativeElement,
        'left',
        this.left + 'px'
      );
    }
  }

  onRight() {
    if (this.deals.length > 0) {
      this.sliderSubscription.unsubscribe();
      if (this.pauseSubscription) this.pauseSubscription.unsubscribe();
      this.pauseSubscription = timer(30000).subscribe(() => {
        this.slide();
      });
      const value = window.innerWidth;
      this.left -= value;
      if (this.left <= -(value * this.deals.length)) {
        this.left = 0;
      }
      this.updateSlide();
    }
  }

  onLeft() {
    if (this.deals.length > 0) {
      this.sliderSubscription.unsubscribe();
      if (this.pauseSubscription) this.pauseSubscription.unsubscribe();
      this.pauseSubscription = timer(30000).subscribe(() => {
        this.slide();
      });
      const value = window.innerWidth;
      this.left += value;
      if (this.left > 0) {
        this.left = -(value * (this.deals.length - 1));
      }
      this.updateSlide();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.left = 0;
    if (this.slidesElRef) {
      this.renderer.setStyle(
        this.slidesElRef.nativeElement,
        'left',
        this.left + 'px'
      );
    }
  }

  ngOnDestroy() {
    if (this.sliderSubscription) this.sliderSubscription.unsubscribe();
    if (this.pauseSubscription) this.pauseSubscription.unsubscribe();
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
