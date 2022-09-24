import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense, ExpensesService } from '@money-tracker/common';

@Component({
  selector: 'money-tracker-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisionComponent implements OnInit {
  yearlyExpenses$: BehaviorSubject<Expense[]>;
  monthlyExpenses$: BehaviorSubject<Expense[]>;
  constructor(private expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.yearlyExpenses$ = this.expensesService.yearlyExpenses$;
    this.monthlyExpenses$ = this.expensesService.monthlyExpenses$;
  }

  handleAddExpense() {
    console.log('******** addExpense ********');
  }
}
