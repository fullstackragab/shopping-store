import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.css'],
})
export class ProductRatingComponent implements OnInit {
  @Input() rating: string = '0';
  @Input() numberOfRatings: string = '0';
  emptyArray = Array(5);
  fillArray = Array(5);
  half = false;
  originalRating: string = '0';

  constructor() {}

  ngOnInit(): void {
    this.originalRating = this.rating;
    if (+this.rating > 5) {
      this.rating = '5';
    }
    if (+this.rating < 0) {
      this.rating = '0';
    }
    if (+this.rating % 1 !== 0) {
      this.rating = (+this.rating - (+this.rating % 1)).toString();
      this.half = true;
      this.fillArray = Array(+this.rating);
      this.emptyArray = Array(5 - +this.rating - 1);
    } else {
      this.fillArray = Array(+this.rating);
      this.emptyArray = Array(5 - +this.rating);
    }
  }
}
