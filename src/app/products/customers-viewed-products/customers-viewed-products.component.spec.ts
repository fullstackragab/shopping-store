import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersViewedProductsComponent } from './customers-viewed-products.component';

describe('CustomersViewedProductsComponent', () => {
  let component: CustomersViewedProductsComponent;
  let fixture: ComponentFixture<CustomersViewedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersViewedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersViewedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
