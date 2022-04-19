import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  loadingStateUpdate = new BehaviorSubject<'start' | 'end'>('end');

  private loadingArray: string[] = [];
  private timeout!: number;

  startLoading(value: string | string[]) {
    if (this.loadingArray.length === 0) {
      if (typeof value === 'string') {
        this.loadingArray.push(value);
      } else if (Array.isArray(value)) {
        for (let id of value) {
          this.loadingArray.push(id);
        }
      }
      this.loadingStateUpdate.next('start');
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = window.setTimeout(() => {
        if (this.loadingArray.length !== 0) {
          this.loadingArray = [];
          this.loadingStateUpdate.next('end');
        }
      }, 10000);
    }
  }

  endLoading(id: string) {
    const index = this.loadingArray.indexOf(id);
    if (index !== -1) {
      this.loadingArray.splice(index, 1);
    }
    if (this.loadingArray.length === 0) {
      this.loadingStateUpdate.next('end');
    }
  }
}
