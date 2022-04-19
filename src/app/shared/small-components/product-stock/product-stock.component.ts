import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.css']
})
export class ProductStockComponent implements OnInit {

  @Input() stock: string = '0';
  
  constructor() { }

  ngOnInit(): void {
  }

}
