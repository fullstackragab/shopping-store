import { ProductFilterItem } from './product-filter-item.model';

export interface ProductFilter {
  brands: ProductFilterItem[];
  prices: ProductFilterItem[];
  colors: ProductFilterItem[];
  conditions: ProductFilterItem[];
}
