import { Injectable } from '@angular/core';
import {
  combineLatest,
  combineLatestWith,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  take,
} from 'rxjs';
import {
  CategoriesService,
  COLLECTIONS,
  DialogService,
  ExpenseGroup,
  FirestoreService,
  Income,
  UserService,
} from '@money-tracker/common';

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
    const defaultIncome$ = this.userService.userStream$.pipe(
      map((user) => ({
        value: 0,
        id: '',
        user: user?.id || '',
      }))
    );
    return this.firestoreService
      .getCollection<Income>(COLLECTIONS.INCOME)
      .pipe(switchMap(([income]) => (income ? of(income) : defaultIncome$)));
  }
  get monthlyExpensesVision$(): Observable<ExpenseGroup[]> {
    return this.convertExpenseNameToCategory(
      this.firestoreService.getCollection<ExpenseGroup>(
        COLLECTIONS.MONTHLY_EXPENSES
      )
    );
  }
  get yearlyExpensesVision$(): Observable<ExpenseGroup[]> {
    return this.convertExpenseNameToCategory(
      this.firestoreService.getCollection<ExpenseGroup>(
        COLLECTIONS.YEARLY_EXPENSES
      )
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
    return combineLatest([
      this.totalVisionMonthlyExpenses$,
      this.moneyForYearlyExpenses$,
      this.income$,
    ]).pipe(
      map(([totalExpanses, yearlyExpanses, income]) => {
        if (income.value) {
          return income.value - totalExpanses - yearlyExpanses;
        }
        return 0;
      })
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
  async createExpense(expense: Partial<ExpenseGroup>, isYearly: boolean) {
    const categoryId = await this.categoriesService.createCategory(
      expense?.name || '',
      isYearly
    );
    if (categoryId) {
      const collection = isYearly
        ? COLLECTIONS.YEARLY_EXPENSES
        : COLLECTIONS.MONTHLY_EXPENSES;
      await this.firestoreService.createDocument<ExpenseGroup>(collection, {
        ...expense,
        name: categoryId,
      });
    }
  }

  deleteExpense(expense: ExpenseGroup, isYearly: boolean) {
    const collection = isYearly
      ? COLLECTIONS.YEARLY_EXPENSES
      : COLLECTIONS.MONTHLY_EXPENSES;
    this.firestoreService.deleteDocument<ExpenseGroup>(collection, expense.id);
  }
  async editExpense(expense: ExpenseGroup, isYearly: boolean) {
    const collection = isYearly
      ? COLLECTIONS.YEARLY_EXPENSES
      : COLLECTIONS.MONTHLY_EXPENSES;
    if (expense.id) {
      this.firestoreService.updateDocument<ExpenseGroup>(
        collection,
        expense.id,
        expense
      );
    } else {
      await this.createExpense(expense, isYearly);
    }
  }
  convertExpenseNameToCategory(
    expenses$: Observable<ExpenseGroup[]>
  ): Observable<ExpenseGroup[]> {
    return combineLatest([this.categoriesService.categories$, expenses$]).pipe(
      startWith([[], []]),
      map(([categories, expenses]) => {
        if (categories.length && expenses.length) {
          return expenses.map((expense) => ({
            ...expense,
            name:
              categories.find((category) => category.id === expense.name)
                ?.name || expense.name,
          }));
        }
        return [];
      })
    );
  }
}
