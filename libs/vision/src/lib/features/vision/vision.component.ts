import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, combineLatestWith, map, Observable, tap } from 'rxjs';
import { ExpenseGroup, Income } from '@money-tracker/common';
import { VisionService } from '../../services/vision.service';

@Component({
  selector: 'money-tracker-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisionComponent implements OnInit {
  summaries$: Observable<{ title: string; value: number }[]>;
  yearlyExpenses$: Observable<ExpenseGroup[]>;
  monthlyExpenses$: Observable<ExpenseGroup[]>;
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
    this.summaries$ = combineLatest([
      this.visionService.totalVisionMonthlyExpenses$,
      this.visionService.moneyForYearlyExpenses$,
      this.visionService.moneyForRainyDay,
      this.visionService.forInvestment,
    ]).pipe(
      map(([totalExpenses, yearlyExpenses, rainyDay, forInvestment]) => {
        return [
          { title: 'For rainy day', value: rainyDay },
          { title: 'Total monthly expenses', value: totalExpenses },
          { title: 'For investment', value: forInvestment },
          { title: 'For yearly expenses', value: yearlyExpenses },
        ];
      })
    );
  }

  onDeleteExpense({
    expense,
    isYearly = false,
  }: {
    expense: ExpenseGroup;
    isYearly?: boolean;
  }) {
    this.visionService.deleteExpense(expense, isYearly);
  }
  onEditExpense(expense: ExpenseGroup, isYearly = false) {
    this.visionService.editExpense(expense, isYearly);
  }
}
