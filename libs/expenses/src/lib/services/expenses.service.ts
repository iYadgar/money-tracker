import { Injectable } from '@angular/core';
import {
  CategoriesService,
  COLLECTIONS,
  DETAILED_EXPENSES_TABLE_VIEW_CONFIG,
  DetailedExpense,
  FirestoreService,
  TableViewConfig,
  UserService,
} from '@money-tracker/common';
import { combineLatest, map, Observable, startWith, Subject, tap } from 'rxjs';
import { TableBulkUpdateEvent } from '../../../../ui/src/lib/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private isImporting$ = new Subject<boolean>();
  private isUpdatingBulk$ = new Subject<boolean>();

  get detailedExpenses$(): Observable<DetailedExpense[]> {
    return combineLatest([
      this.firestoreService.getCollection<DetailedExpense>(
        COLLECTIONS.DETAILED_EXPENSES
      ),
      this.categoriesService.categories$,
    ]).pipe(
      map(([expenses, categories]) => {
        return expenses.map((expense) => ({
          ...expense,
          category:
            categories.find((category) => category.id === expense.category)
              ?.name || '',
        }));
      })
    );
  }
  get isLoading$(): Observable<boolean> {
    return combineLatest([
      this.isImporting$.asObservable(),
      this.isUpdatingBulk$.asObservable(),
    ]).pipe(
      map(([isImporting, isUpdating]) => isImporting || isUpdating),
      startWith(false)
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
  getGridViewConfig(): Observable<TableViewConfig> {
    return this.categoriesService.categories$
      .pipe(
        map((categories): TableViewConfig => {
          const category = {
            label: 'Category',
            filter: true,
            selectableValues: categories.map((category) => ({
              value: category.id,
              viewValue: category.name,
            })),
          };
          return {
            ...DETAILED_EXPENSES_TABLE_VIEW_CONFIG,
            columnDefs: {
              ...DETAILED_EXPENSES_TABLE_VIEW_CONFIG.columnDefs,
              category,
            },
          };
        })
      )
      .pipe(tap(console.log));
  }

  async handleImportExpenses(data: any[][]) {
    const handleDate = (date: Date | string): string => {
      if (date instanceof Date) {
        return date.toISOString();
      }
      const mappedDate = date.split('/').reverse().join('/');
      return new Date(mappedDate).toISOString();
    };
    const expenses = data.map(([date, name, value]) => {
      const expense: Partial<DetailedExpense> = {
        user: this.userService.user.id,
        date: handleDate(date),
        name,
        value,
      };
      return expense;
    });
    this.isImporting$.next(true);
    await this.firestoreService.uploadBatch<Partial<DetailedExpense>>(
      COLLECTIONS.DETAILED_EXPENSES,
      expenses
    );
    this.isImporting$.next(false);
  }

  async bulkUpdate(data: TableBulkUpdateEvent) {
    console.log('data:', data);
    console.log(`****** ??? ******`);
    this.isUpdatingBulk$.next(true);
    await this.firestoreService.batchUpdate<Partial<DetailedExpense>>(
      COLLECTIONS.DETAILED_EXPENSES,
      data.selectedRows,
      { [data.field]: data.value }
    );
    this.isUpdatingBulk$.next(false);
  }
}
