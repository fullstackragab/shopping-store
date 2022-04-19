import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-discount',
  templateUrl: './product-discount.component.html',
  styleUrls: ['./product-discount.component.css']
})
export class ProductDiscountComponent implements OnInit {

  @Input() discount: string = '0';
  @Input() fontSize: string = 'small';
  
  constructor() { }

  ngOnInit(): void {
  }

}
