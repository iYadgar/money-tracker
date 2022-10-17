import { Injectable } from '@angular/core';
import { ExpensesService } from '@money-tracker/expenses';
import { VisionService } from '@money-tracker/vision';
import {
  DetailedExpense,
  ExpenseByCategory,
  ExpenseByMonth,
} from '@money-tracker/common';
import { combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  get expensesByMonthDict$(): Observable<Record<string, number>> {
    return this.expensesService.detailedExpenses$.pipe(
      map(this.getExpensesByMonthDict)
    );
  }

  get expensesByCategories$(): Observable<ExpenseByCategory[]> {
    return this.expensesService.detailedExpenses$.pipe(
      map(this.getExpensesByCategory)
    );
  }

  get totalMonthlyExpenses$(): Observable<ExpenseByMonth[]> {
    return combineLatest([
      this.visionService.income$,
      this.visionService.moneyForYearlyExpenses$,
      this.expensesByMonthDict$,
    ]).pipe(
      map(([{ value: income }, toSafeFund, expensesByMonthDict]) => {
        return Object.entries(expensesByMonthDict).map(
          ([key, expensesAmount]) => {
            const month = +key.split('/')[0] + 1;
            const year = +key.split('/')[1];
            return {
              month,
              year,
              income,
              expensesAmount,
              toSafeFund,
              toInvestment: income - expensesAmount - toSafeFund,
            };
          }
        );
      })
    );
  }

  constructor(
    private expensesService: ExpensesService,
    private visionService: VisionService
  ) {}

  getExpensesByMonthDict(expenses: DetailedExpense[]) {
    return expenses.reduce((acc, expense) => {
      const expenseDate = new Date(expense.date);
      const expenseKey = `${
        expenseDate.getMonth() + 1
      }/${expenseDate.getFullYear()}`;
      if (!!acc[expenseKey] as boolean) {
        acc[expenseKey] += expense.value;
      } else {
        acc[expenseKey] = expense.value;
      }
      return acc;
    }, {} as Record<string, number>);
  }

  getExpensesByCategory(expenses: DetailedExpense[]): ExpenseByCategory[] {
    const expensesByCategoryMap = expenses.reduce((acc, expense) => {
      if (expense.category) {
        acc[expense.category] = {
          category: expense.category,
          amount: (acc[expense.category]?.amount || 0) + expense.value,
          date: expense.date,
        };
      } else {
        acc['other'] = {
          category: 'Other',
          amount: (acc['other']?.amount || 0) + expense.value,
          date: expense.date,
        };
      }
      return acc;
    }, {} as Record<string, ExpenseByCategory>);
    return Object.values(expensesByCategoryMap);
  }
}
