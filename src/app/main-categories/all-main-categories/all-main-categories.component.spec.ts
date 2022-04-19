import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMainCategoriesComponent } from './all-main-categories.component';

describe('AllMainCategoriesComponent', () => {
  let component: AllMainCategoriesComponent;
  let fixture: ComponentFixture<AllMainCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMainCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMainCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
