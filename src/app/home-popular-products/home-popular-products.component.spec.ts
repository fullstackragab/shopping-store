import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePopularProductsComponent } from './home-popular-products.component';

describe('HomePopularProductsComponent', () => {
  let component: HomePopularProductsComponent;
  let fixture: ComponentFixture<HomePopularProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePopularProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePopularProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
