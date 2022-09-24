import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatestWith, map, Observable } from 'rxjs';
import { Expense } from '@money-tracker/common';
import { VisionService } from '../../services/vision.service';

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
  constructor(private visionService: VisionService) {}

  ngOnInit(): void {
    this.yearlyExpenses$ = this.visionService.yearlyExpensesVision$;
    this.monthlyExpenses$ = this.visionService.monthlyExpensesVision$;
    this.income$ = this.visionService.income$;
    this.setSummaries();
  }

  onUpdateIncome(value: number) {
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

  onAddExpanse(isYearly = false) {
    this.visionService.onAddExpanse(isYearly).subscribe(console.log);
  }
}
