import { Injectable } from '@angular/core';
import { combineLatestWith, map, Observable } from 'rxjs';
import {
  CategoriesService,
  COLLECTIONS,
  DialogService,
  ExpenseGroup,
  FirestoreService,
  Income,
  UserService,
} from '@money-tracker/common';
import { QueryFn } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class VisionService {
  get totalVisionMonthlyExpenses$() {
    return this.monthlyExpensesVision$.pipe(
      map((monthlyExpenses) => {
        return monthlyExpenses.reduce((pre, cur) => pre + cur.value, 0);
      })
    );
  }
  get income$(): Observable<Income> {
    const defaultIncome = {
      user: this.userService.user.id || '',
      value: 0,
      id: '',
    };
    const queryFn: QueryFn = (ref) =>
      ref.where('user', '==', this.userService.user.id);
    return this.firestoreService
      .getCollection<Income>(COLLECTIONS.INCOME, queryFn)
      .pipe(map(([income]) => (income ? income : defaultIncome)));
  }
  get monthlyExpensesVision$(): Observable<ExpenseGroup[]> {
    return this.firestoreService.getCollection<ExpenseGroup>(
      COLLECTIONS.MONTHLY_EXPANSES
    );
  }
  get yearlyExpensesVision$(): Observable<ExpenseGroup[]> {
    return this.firestoreService.getCollection<ExpenseGroup>(
      COLLECTIONS.YEARLY_EXPANSES
    );
  }

  get moneyForYearlyExpenses$() {
    return this.yearlyExpensesVision$.pipe(
      map(
        (yearlyExpanses) =>
          yearlyExpanses.reduce((pre, cur) => pre + cur.value, 0) / 12
      )
    );
  }
  get moneyForRainyDay() {
    return this.totalVisionMonthlyExpenses$.pipe(
      map((totalExpense) => totalExpense * 3)
    );
  }

  get forInvestment() {
    return this.totalVisionMonthlyExpenses$.pipe(
      combineLatestWith(this.moneyForYearlyExpenses$),
      map(([totalExpanses, yearlyExpanses]) => totalExpanses - yearlyExpanses)
    );
  }

  constructor(
    private dialogService: DialogService,
    private firestoreService: FirestoreService,
    private userService: UserService,
    private categoriesService: CategoriesService
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
  createExpense(expense: Partial<ExpenseGroup>, isYearly: boolean) {
    const collection = isYearly
      ? COLLECTIONS.YEARLY_EXPANSES
      : COLLECTIONS.MONTHLY_EXPANSES;
    return this.firestoreService
      .createDocument<ExpenseGroup>(collection, expense)
      .then(() => {
        this.categoriesService.createCategory(expense?.name || '', isYearly);
      });
  }

  deleteExpense(expense: ExpenseGroup, isYearly: boolean) {
    const collection = isYearly
      ? COLLECTIONS.YEARLY_EXPANSES
      : COLLECTIONS.MONTHLY_EXPANSES;
    this.firestoreService.deleteDocument<ExpenseGroup>(collection, expense.id);
  }
  editExpense(expense: ExpenseGroup, isYearly: boolean) {
    const collection = isYearly
      ? COLLECTIONS.YEARLY_EXPANSES
      : COLLECTIONS.MONTHLY_EXPANSES;
    if (expense.id) {
      this.firestoreService.updateDocument<ExpenseGroup>(
        collection,
        expense.id,
        expense
      );
    } else {
      this.createExpense(expense, isYearly);
    }
  }
}
