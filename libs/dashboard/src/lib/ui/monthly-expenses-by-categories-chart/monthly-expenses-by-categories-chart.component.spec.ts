import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyExpensesByCategoriesChartComponent } from './monthly-expenses-by-categories-chart.component';

describe('MonthlyExpensesByCategoriesChartComponent', () => {
  let component: MonthlyExpensesByCategoriesChartComponent;
  let fixture: ComponentFixture<MonthlyExpensesByCategoriesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyExpensesByCategoriesChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      MonthlyExpensesByCategoriesChartComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
