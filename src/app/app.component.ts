import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoadingService } from './utils/ui/service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('top') top!: ElementRef;
  loading = false;
  susbcriptions: Subscription[] = [];

  constructor(private router: Router, private loadingService: LoadingService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.susbcriptions.push(
      this.loadingService.loadingStateUpdate.subscribe((state) => {
        if (state === 'start') this.loading = true;
        else this.loading = false;
        this.cdr.detectChanges();
      })
    );
    this.router.events
      .pipe(
        filter((event) => {
          return (
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
          );
        })
      )
      .subscribe((event) => {
        (this.top.nativeElement as HTMLElement).scrollIntoView();
      });
  }

  ngOnDestroy() {
    for (let subscription of this.susbcriptions) {
      subscription.unsubscribe();
    }
  }
}
