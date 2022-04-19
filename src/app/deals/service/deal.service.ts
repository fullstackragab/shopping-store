import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { Deal } from './deal.model';
import { dealsData, dealsDataLarge } from './deals.data';

@Injectable({ providedIn: 'root' })
export class DealService {
  getDeals(breakpoint: 'small' | 'large'): Observable<Deal[]> {
    if (breakpoint === 'large') {
      return Utils.getObservable<Deal[]>(dealsDataLarge.slice());
    } else {
      return Utils.getObservable<Deal[]>(dealsData.slice());
    }
  }
}
