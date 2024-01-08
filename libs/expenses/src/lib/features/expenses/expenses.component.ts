import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DetailedExpense, TableViewConfig } from '@money-tracker/common';
import { Observable } from 'rxjs';
import { ExpensesService } from '../../services/expenses.service';
import { TableBulkUpdateEvent } from '@money-tracker/ui';

@Component({
  selector: 'money-tracker-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent implements OnInit {
  viewConfig$: Observable<TableViewConfig>;
  isLoading$: Observable<boolean>;
  detailedExpenses$: Observable<DetailedExpense[]>;
  constructor(private expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.viewConfig$ = this.expensesService.getGridViewConfig();
    this.detailedExpenses$ = this.expensesService.detailedExpenses$;
    this.isLoading$ = this.expensesService.isLoading$;
  }

  handleDeleteExpense(expense: DetailedExpense) {
    this.expensesService.deleteExpense(expense);
  }

  handleEditCell(expense: DetailedExpense) {
    this.expensesService.editExpense({
      ...expense,
      value: +expense.value || 0,
    });
  }

  async handleImport($event: any[][]) {
    await this.expensesService.handleImportExpenses($event);
  }
  async bulkUpdate(event: TableBulkUpdateEvent) {
    await this.expensesService.bulkUpdate(event);
  }
}
