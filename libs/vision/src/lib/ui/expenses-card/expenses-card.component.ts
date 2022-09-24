import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Expense, SettingsService } from '@money-tracker/common';
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
  currency$: BehaviorSubject<string>;

  constructor(private settingsService: SettingsService) {}

  handleAddExpense() {
    this.addExpense.emit();
  }

  ngOnInit(): void {
    this.currency$ = this.settingsService.currencyType$;
  }
}
