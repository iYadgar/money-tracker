import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './features/expenses/expenses.component';
import { UiModule } from '@money-tracker/ui';

@NgModule({
  imports: [CommonModule, ExpensesRoutingModule, UiModule],
  declarations: [ExpensesComponent],
})
export class ExpensesModule {}
