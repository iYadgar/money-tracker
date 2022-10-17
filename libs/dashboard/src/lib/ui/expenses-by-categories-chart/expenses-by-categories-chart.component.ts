import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { map, Observable } from 'rxjs';
import {
  EXPENSE_BY_CATEGORY_CHART_CONFIG,
  ChartDataSource,
} from '@money-tracker/common';

@Component({
  selector: 'money-tracker-expenses-by-categories-chart',
  templateUrl: './expenses-by-categories-chart.component.html',
  styleUrls: ['./expenses-by-categories-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesByCategoriesChartComponent implements OnInit {
  expensesByCategories$: Observable<ChartDataSource[]>;
  viewConfig = EXPENSE_BY_CATEGORY_CHART_CONFIG;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.expensesByCategories$ =
      this.dashboardService.expensesByCategories$.pipe(
        map((expenses) =>
          expenses
            .map((expense) => ({
              value: expense.amount,
              name: expense.category,
            }))
            .sort((a, b) => b.value - a.value)
        )
      );
  }
}
