import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './features/expenses/expenses.component';
import { UiModule } from '@money-tracker/ui';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthGuard } from '@angular/fire/auth-guard';

@NgModule({
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    UiModule,
    MatProgressSpinnerModule,
  ],
  declarations: [ExpensesComponent],
  providers: [AuthGuard],
})
export class ExpensesModule {}
