import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ExpenseGroup,
  EXPENSES_TABLE_VIEW_CONFIG,
  SettingsService,
} from '@money-tracker/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'money-tracker-expenses-card',
  templateUrl: './expenses-card.component.html',
  styleUrls: ['./expenses-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesCardComponent implements OnInit {
  @Input() title: string;
  @Input() expenses: ExpenseGroup[];
  @Output() addExpense = new EventEmitter<void>();
  @Output() deleteExpense = new EventEmitter<ExpenseGroup>();
  @Output() editExpense = new EventEmitter<ExpenseGroup>();
  currency$: BehaviorSubject<string>;
  viewConfig = EXPENSES_TABLE_VIEW_CONFIG;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.currency$ = this.settingsService.currencyType$;
  }

  handleDeleted(expense: ExpenseGroup) {
    this.deleteExpense.emit(expense);
  }
  handleEdited(expense: ExpenseGroup) {
    this.editExpense.emit({ ...expense, value: +expense.value });
  }
}
