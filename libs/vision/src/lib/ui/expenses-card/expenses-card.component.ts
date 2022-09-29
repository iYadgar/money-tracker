import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  Expense,
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
  @Input() expenses: Expense[];
  @Output() addExpense = new EventEmitter<void>();
  @Output() deleteExpense = new EventEmitter<Expense>();
  currency$: BehaviorSubject<string>;
  viewConfig = EXPENSES_TABLE_VIEW_CONFIG;

  constructor(private settingsService: SettingsService) {}

  handleAddExpense() {
    this.addExpense.emit();
  }

  ngOnInit(): void {
    this.currency$ = this.settingsService.currencyType$;
  }

  handleDeleted(expense: Expense) {
    this.deleteExpense.emit(expense);
  }
}
