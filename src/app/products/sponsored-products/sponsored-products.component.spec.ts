import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsoredProductsComponent } from './sponsored-products.component';

describe('SponsoredProductsComponent', () => {
  let component: SponsoredProductsComponent;
  let fixture: ComponentFixture<SponsoredProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsoredProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsoredProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
