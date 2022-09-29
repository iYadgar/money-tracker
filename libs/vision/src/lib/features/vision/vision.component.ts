import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatestWith, map, Observable, tap } from 'rxjs';
import { Expense, Income } from '@money-tracker/common';
import { VisionService } from '../../services/vision.service';

@Component({
  selector: 'money-tracker-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisionComponent implements OnInit {
  summaries$: Observable<{ title: string; value: number }[]>;
  yearlyExpenses$: Observable<Expense[]>;
  monthlyExpenses$: Observable<Expense[]>;
  income$: Observable<Income>;
  constructor(private visionService: VisionService) {}

  ngOnInit() {
    this.visionService.initExpensesAndIncome();
    this.visionService.initIncome();
    this.yearlyExpenses$ = this.visionService.yearlyExpensesVision$;
    this.monthlyExpenses$ = this.visionService.monthlyExpensesVision$;
    this.income$ = this.visionService.income$.pipe(tap(console.log));
    this.setSummaries();
  }

  onUpdateIncome(value: Income) {
    this.visionService.setIncome(value);
  }
  setSummaries() {
    this.summaries$ = this.visionService.totalVisionMonthlyExpenses$.pipe(
      combineLatestWith(this.visionService.moneyForYearlyExpanses$),
      map(([totalExpanses, yearlyExpanses]) => [
        { title: 'Total monthly expanses', value: totalExpanses },
        { title: 'For yearly expanses', value: yearlyExpanses },
      ]),
      combineLatestWith(this.visionService.moneyForRainyDay),
      map(([summaries, rainyDay]) => [
        ...summaries,
        { title: 'For rainy day', value: rainyDay },
      ]),
      combineLatestWith(this.visionService.forInvestment),
      map(([summaries, forInvestment]) => [
        ...summaries,
        { title: 'For investment', value: forInvestment },
      ])
    );
  }

  onAddExpense(isYearly = false) {
    this.visionService.onAddExpanse(isYearly);
  }
  onDeleteExpense({
    expense,
    isYearly = false,
  }: {
    expense: Expense;
    isYearly?: boolean;
  }) {
    this.visionService.deleteExpense(expense, isYearly);
  }
}
