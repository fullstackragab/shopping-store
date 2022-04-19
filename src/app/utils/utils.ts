import { Observable } from 'rxjs';

export class Utils {
  public static getObservable<T>(value: any, delay = false): Observable<T> {
    const observable = new Observable<T>((observer) => {
      if (delay) {
        setTimeout(() => {
          observer.next(value);
        }, 100);
      } else {
        observer.next(value);
      }
    });

    return observable;
  }

  public static limit(value: string, limit: number = 100) {
    if (value && value.length > limit) {
      const items = value.split(' ');
      let data = '';
      for (let item of items) {
        if (data.length + item.length < limit) {
          data = data + ' ' + item;
        } else {
          break;
        }
      }
      return data + '...';
    }
    return value;
  }

  public static friendlyUrl(value: string) {
    if (value && value.length > 0)
      return value
        .replace(/[^a-z0-9]/gi, '-')
        .split('-')
        .filter((i) => i)
        .slice(0, 20)
        .join('-');
    return value;
  }
  public static getPriceAfterDiscount(
    value: string,
    percentage: string
  ): string {
    return Math.floor(((100 - +percentage) * +value) / 100).toFixed(2);
  }
}
