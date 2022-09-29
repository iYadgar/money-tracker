import { Injectable } from '@angular/core';
import { combineLatestWith, map, Observable, take, tap } from 'rxjs';
import {
  COLLECTIONS,
  Expense,
  FirestoreService,
  Income,
  UserService,
} from '@money-tracker/common';
import { LayoutService } from '@money-tracker/layout';
import { AddExpanseDialogComponent } from '../ui/add-expanse-dialog/add-expanse-dialog.component';
import { QueryFn } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class VisionService {
  monthlyExpensesVision$: Observable<Expense[]>;
  yearlyExpensesVision$: Observable<Expense[]>;
  income$: Observable<Income>;

  get totalVisionMonthlyExpenses$() {
    return this.monthlyExpensesVision$.pipe(
      map((monthlyExpenses) => {
        return monthlyExpenses.reduce((pre, cur) => pre + cur.value, 0);
      })
    );
  }

  get moneyForYearlyExpanses$() {
    return this.yearlyExpensesVision$.pipe(
      map(
        (yearlyExpanses) =>
          yearlyExpanses.reduce((pre, cur) => pre + cur.value, 0) / 12
      )
    );
  }
  get moneyForRainyDay() {
    return this.totalVisionMonthlyExpenses$.pipe(
      combineLatestWith(this.moneyForYearlyExpanses$),
      map(
        ([totalExpanse, yearlyExpenses]) => (totalExpanse - yearlyExpenses) * 3
      )
    );
  }

  get forInvestment() {
    return this.totalVisionMonthlyExpenses$.pipe(
      combineLatestWith(this.moneyForYearlyExpanses$),
      map(([totalExpanses, yearlyExpanses]) => totalExpanses - yearlyExpanses)
    );
  }

  constructor(
    private layoutService: LayoutService,
    private firestoreService: FirestoreService,
    private userService: UserService
  ) {}

  setIncome(income: Income) {
    if (income.id) {
      return this.firestoreService.updateDocument<Income>(
        COLLECTIONS.INCOME,
        income.id,
        income
      );
    }
    return this.firestoreService.createDocument(COLLECTIONS.INCOME, income);
  }
  onAddExpanse(isYearly: boolean) {
    const collection = isYearly
      ? COLLECTIONS.YEARLY_EXPANSES
      : COLLECTIONS.MONTHLY_EXPANSES;
    return this.layoutService
      .openDialog(AddExpanseDialogComponent)
      .afterClosed()
      .pipe(
        tap((expense) => {
          this.firestoreService.createDocument<Expense>(collection, expense);
        }),
        take(1)
      )
      .subscribe();
  }

  initExpensesAndIncome() {
    this.monthlyExpensesVision$ = this.firestoreService.getCollection<Expense>(
      COLLECTIONS.MONTHLY_EXPANSES
    );

    this.yearlyExpensesVision$ = this.firestoreService.getCollection<Expense>(
      COLLECTIONS.YEARLY_EXPANSES
    );
  }
  initIncome() {
    const defaultIncome = {
      user: this.userService.user.id || '',
      value: 0,
      id: '',
    };
    const queryFn: QueryFn = (ref) =>
      ref.where('user', '==', this.userService.user.id);
    this.income$ = this.firestoreService
      .getCollection<Income>(COLLECTIONS.INCOME, queryFn)
      .pipe(map(([income]) => (income ? income : defaultIncome)));
  }

  deleteExpense(expense: Expense, isYearly: boolean) {
    const collection = isYearly
      ? COLLECTIONS.YEARLY_EXPANSES
      : COLLECTIONS.MONTHLY_EXPANSES;
    if (expense.id) {
      this.firestoreService.deleteDocument<Expense>(collection, expense.id);
    }
  }
}
