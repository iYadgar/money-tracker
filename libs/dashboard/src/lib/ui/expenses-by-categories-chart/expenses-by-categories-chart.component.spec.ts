import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesByCategoriesChartComponent } from './expenses-by-categories-chart.component';

describe('ExpensesByCategoriesChartComponent', () => {
  let component: ExpensesByCategoriesChartComponent;
  let fixture: ComponentFixture<ExpensesByCategoriesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpensesByCategoriesChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesByCategoriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
