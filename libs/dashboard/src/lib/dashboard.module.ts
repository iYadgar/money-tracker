import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualExpensesComponent } from './ui/actual-expenses/actual-expenses.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UiModule } from '@money-tracker/ui';
import { ExpensesByCategoriesChartComponent } from './ui/expenses-by-categories-chart/expenses-by-categories-chart.component';
import { MatCardModule } from '@angular/material/card';
import { MonthlyExpensesByCategoriesChartComponent } from './ui/monthly-expenses-by-categories-chart/monthly-expenses-by-categories-chart.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UiModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent,
    ActualExpensesComponent,
    ExpensesByCategoriesChartComponent,
    MonthlyExpensesByCategoriesChartComponent,
  ],
})
export class DashboardModule {}
