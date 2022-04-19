import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsletter-subscription',
  templateUrl: './newsletter-subscription.component.html',
  styleUrls: ['./newsletter-subscription.component.css'],
})
export class NewsletterSubscriptionComponent implements OnInit {
  form!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {}
}
