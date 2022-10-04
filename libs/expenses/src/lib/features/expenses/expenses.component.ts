import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DetailedExpense, TableViewConfig } from '@money-tracker/common';
import { map, Observable } from 'rxjs';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'money-tracker-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent implements OnInit {
  viewConfig$: Observable<TableViewConfig>;
  detailedExpenses$: Observable<DetailedExpense[]>;
  constructor(private expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.viewConfig$ = this.expensesService.getGridViewConfig();
    this.detailedExpenses$ = this.expensesService.detailedExpenses$;
  }

  handleDeleteExpense(expense: DetailedExpense) {
    this.expensesService.deleteExpense(expense);
  }

  handleEditCell(expense: DetailedExpense) {
    console.log('expense:', expense);
    this.expensesService.editExpense(expense);
  }
}
