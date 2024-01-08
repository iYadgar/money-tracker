import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { combineLatest, map, Observable, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  ChartDataSource,
  DetailedExpense,
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
      map((dict) => this.sortSelectableValues(Object.keys(dict)))
    );
    this.relevantExpenses$ = combineLatest([
      this.dashboardService.detailedExpensesByMonthDict$,
      this.selectableValues$.pipe(
        switchMap((selectableValues) => {
          if (!this.selectedMonthControl.value) {
            this.selectedMonthControl.setValue(selectableValues[0]);
          }
          return this.selectedMonthControl.valueChanges.pipe(
            startWith(selectableValues[0])
          );
        })
      ),
    ]).pipe(
      map(([expenses, selectedDate]) => {
        // if (selectedDate) {
          return this.getExpensesToChart(expenses[selectedDate] || []);
        }
        return [];
      })
    );
  }

  getExpensesToChart(
    expenses: DetailedExpense[]
  ): { name: string; value: number }[] {
    if (!expenses.length) {
      return [];
    }
    const expensesByCategoryMap = expenses.reduce((acc, expense) => {
      const category = expense?.category;
      if (category) {
        if (acc[category]) {
          acc[category] = {
            name: category,
            value: acc[category]?.value + expense.value,
          };
        } else {
          {
            acc[category] = {
              name: category,
              value: expense.value,
            };
          }
        }
      } else {
        acc['other'] = {
          value: (acc['other']?.value || 0) + expense.value,
          name: 'Other',
        };
      }
      return acc;
    }, {} as Record<string, { name: string; value: number }>);
    return Object.values(expensesByCategoryMap);
  }
  sortSelectableValues(selectableValues: string[]) {
    return selectableValues.sort((a, b) => {
      const splitA = a.split('/');
      const splitB = b.split('/');
      return (
        new Date(`${splitB[1]}/${splitB[0]}/01`).getTime() -
        new Date(`${splitA[1]}/${splitA[0]}/01`).getTime()
      );
    });
  }
}
