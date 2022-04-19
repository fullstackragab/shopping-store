import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  @Input() color: 'primary' | 'accent' = 'accent';
  @Input() fontSize: string = 'x-small';

  constructor() { }

  ngOnInit(): void {
  }

}
