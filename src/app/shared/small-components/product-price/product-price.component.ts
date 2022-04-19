import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.css'],
})
export class ProductPriceComponent implements OnInit {
  @Input() listPrice: string = '0';
  @Input() priceAfterDiscount: string = '0';
  @Input() listPriceFontSize: string = 'small';
  @Input() priceAfterDiscountFontSize: string = 'large';
  discount = false;

  constructor() {}

  ngOnInit(): void {
    this.discount = +this.priceAfterDiscount < +this.listPrice;
  }
}
