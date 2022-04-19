import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMainCategoriesComponent } from './home-main-categories.component';

describe('HomeMainCategoriesComponent', () => {
  let component: HomeMainCategoriesComponent;
  let fixture: ComponentFixture<HomeMainCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMainCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMainCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
