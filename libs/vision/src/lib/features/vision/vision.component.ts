import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatestWith, map, Observable } from 'rxjs';
import { Expense, ExpensesService } from '@money-tracker/common';

@Component({
  selector: 'money-tracker-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisionComponent implements OnInit {
  summaries$: Observable<{ title: string; value: number }[]>;
  yearlyExpenses$: BehaviorSubject<Expense[]>;
  monthlyExpenses$: BehaviorSubject<Expense[]>;
  income$: BehaviorSubject<number>;
  constructor(public expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.yearlyExpenses$ = this.expensesService.yearlyExpensesVision$;
    this.monthlyExpenses$ = this.expensesService.monthlyExpensesVision$;
    this.income$ = this.expensesService.income$;
    this.setSummaries();
  }

  handleAddExpense() {
    console.log('******** addExpense ********');
  }

  onUpdateIncome(value: number) {
    this.expensesService.setIncome(value);
  }
  setSummaries() {
    this.summaries$ = this.expensesService.totalVisionMonthlyExpenses$.pipe(
      combineLatestWith(this.expensesService.moneyForYearlyExpanses$),
      map(([totalExpanses, yearlyExpanses]) => [
        { title: 'Total monthly expanses', value: totalExpanses },
        { title: 'For yearly expanses', value: yearlyExpanses },
      ]),
      combineLatestWith(this.expensesService.moneyForRainyDay),
      map(([summaries, rainyDay]) => [
        ...summaries,
        { title: 'For rainy day', value: rainyDay },
      ]),
      combineLatestWith(this.expensesService.forInvestment),
      map(([summaries, forInvestment]) => [
        ...summaries,
        { title: 'For investment', value: forInvestment },
      ])
    );
  }
}
