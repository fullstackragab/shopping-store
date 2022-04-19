import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { salesData, salesDataLarge } from './sale.data';
import { Sale } from './sale.model';

@Injectable({ providedIn: 'root' })
export class SaleService {
  getSales(breakpoint: 'small' | 'large'): Observable<Sale[]> {
    if (breakpoint === 'large') {
      return Utils.getObservable<Sale[]>(salesDataLarge.slice());
    } else {
      return Utils.getObservable<Sale[]>(salesData.slice());
    }
  }
}
