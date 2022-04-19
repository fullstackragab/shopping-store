import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../utils/utils';

@Pipe({
  name: 'limit',
})
export class LimitPipe implements PipeTransform {
  transform(value: string, limit: number = 100): string {
    return Utils.limit(value, limit);
  }
}
