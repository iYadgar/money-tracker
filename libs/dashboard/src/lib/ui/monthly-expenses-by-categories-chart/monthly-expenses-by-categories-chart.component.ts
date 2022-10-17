import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  ChartDataSource,
  MONTHLY_EXPENSE_BY_CATEGORY_CHART_CONFIG,
} from '@money-tracker/common';

@Component({
  selector: 'money-tracker-monthly-expenses-by-categories-chart',
  templateUrl: './monthly-expenses-by-categories-chart.component.html',
  styleUrls: ['./monthly-expenses-by-categories-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthlyExpensesByCategoriesChartComponent implements OnInit {
  selectableValues$: Observable<string[]>;
  relevantExpenses$: Observable<ChartDataSource[]>;
  selectedMonthControl = new FormControl<string>('');
  viewConfig = MONTHLY_EXPENSE_BY_CATEGORY_CHART_CONFIG;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.selectableValues$ = this.dashboardService.expensesByMonthDict$.pipe(
      map((dict) => Object.keys(dict))
    );
    this.selectedMonthControl.valueChanges.subscribe(console.log);
    this.relevantExpenses$ = combineLatest([
      this.dashboardService.expensesByCategories$,
      this.selectedMonthControl.valueChanges,
    ]).pipe(
      map(([expenses, selectedDate]) => {
        if (selectedDate) {
          return expenses
            .filter((expense) => {
              const expenseDate = new Date(expense.date);
              const expenseMonth = expenseDate.getMonth() + 1;
              const expenseYear = expenseDate.getFullYear();
              const splitDate = selectedDate.split('/');
              const selectedMonth = splitDate[0];
              const selectedYear = splitDate[1];
              return (
                +selectedMonth === expenseMonth && +selectedYear === expenseYear
              );
            })
            .map((expense) => ({
              name: expense.category,
              value: expense.amount,
            }));
        }
        return [];
      })
    );
  }
}
