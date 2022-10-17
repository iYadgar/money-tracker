import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Observable } from 'rxjs';
import {
  ACTUAL_EXPENSES_TABLE_CONFIG,
  ExpenseByMonth,
} from '@money-tracker/common';

@Component({
  selector: 'money-tracker-actual-expenses',
  templateUrl: './actual-expenses.component.html',
  styleUrls: ['./actual-expenses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActualExpensesComponent implements OnInit {
  viewConfig = ACTUAL_EXPENSES_TABLE_CONFIG;
  expensesByMonth$: Observable<ExpenseByMonth[]>;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.expensesByMonth$ = this.dashboardService.totalMonthlyExpenses$;
  }
}
