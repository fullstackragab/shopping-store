import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-best-seller',
  templateUrl: './product-best-seller.component.html',
  styleUrls: ['./product-best-seller.component.css']
})
export class ProductBestSellerComponent implements OnInit {

  @Input() color: 'primary' | 'accent' = 'primary';
  @Input() fontSize: string = 'x-small';
  
  constructor() { }

  ngOnInit(): void {
  }

}
