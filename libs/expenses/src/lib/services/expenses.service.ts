import { Injectable } from '@angular/core';
import {
  CategoriesService,
  COLLECTIONS,
  DETAILED_EXPENSES_TABLE_VIEW_CONFIG,
  DetailedExpense,
  FirestoreService,
  UserService,
} from '@money-tracker/common';
import { combineLatest, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  get detailedExpenses$(): Observable<DetailedExpense[]> {
    return combineLatest([
      this.firestoreService.getCollection<DetailedExpense>(
        COLLECTIONS.DETAILED_EXPENSES
      ),
      this.categoriesService.categories$,
    ]).pipe(
      map(([expenses, categories]) =>
        expenses.map((expense) => ({
          ...expense,
          category:
            categories.find((category) => category.id === expense.category)
              ?.name || '',
        }))
      )
    );
  }
  constructor(
    private firestoreService: FirestoreService,
    private userService: UserService,
    private categoriesService: CategoriesService
  ) {}

  createExpense(expense: Partial<DetailedExpense>) {
    return this.firestoreService.createDocument<DetailedExpense>(
      COLLECTIONS.DETAILED_EXPENSES,
      { ...expense, user: this.userService.user.id }
    );
  }
  deleteExpense(expense: DetailedExpense) {
    return this.firestoreService.deleteDocument<DetailedExpense>(
      COLLECTIONS.DETAILED_EXPENSES,
      expense.id
    );
  }
  editExpense(expense: DetailedExpense) {
    if (expense.id) {
      return this.firestoreService.updateDocument<DetailedExpense>(
        COLLECTIONS.DETAILED_EXPENSES,
        expense.id,
        expense
      );
    }
    return this.createExpense(expense);
  }
  getGridViewConfig() {
    return this.categoriesService.categories$
      .pipe(
        map((categories) => {
          return {
            ...DETAILED_EXPENSES_TABLE_VIEW_CONFIG,
            category: {
              ...DETAILED_EXPENSES_TABLE_VIEW_CONFIG['category'],
              selectableValues: categories.map((category) => ({
                value: category.id,
                viewValue: category.name,
              })),
            },
          };
        })
      )
      .pipe(tap(console.log));
  }
}
