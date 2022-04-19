import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInCategoryComponent } from './top-in-category.component';

describe('TopInCategoryComponent', () => {
  let component: TopInCategoryComponent;
  let fixture: ComponentFixture<TopInCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopInCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopInCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
