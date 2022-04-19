import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersBoughtProductsComponent } from './customers-bought-products.component';

describe('CustomersBoughtProductsComponent', () => {
  let component: CustomersBoughtProductsComponent;
  let fixture: ComponentFixture<CustomersBoughtProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersBoughtProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersBoughtProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
