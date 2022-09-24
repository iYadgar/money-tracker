import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SettingsService } from '@money-tracker/common';

@Component({
  selector: 'money-tracker-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeComponent implements OnInit {
  isEdit$ = new BehaviorSubject(false);
  currency$: BehaviorSubject<string>;

  @Output() updateIncome = new EventEmitter<number>();
  constructor(public settingsService: SettingsService) {}

  ngOnInit(): void {
    this.currency$ = this.settingsService.currencyType$;
  }

  setEditMode(shouldEdit: boolean) {
    this.isEdit$.next(shouldEdit);
  }

  onUpdateIncome(value: string) {
    this.setEditMode(false);
    this.updateIncome.emit(+value);
  }
}
