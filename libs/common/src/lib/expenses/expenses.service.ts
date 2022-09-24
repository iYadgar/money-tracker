import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '@money-tracker/common';

const monthlyExpenses: Expense[] = [
  {
    name: 'rent',
    value: 3500,
  },
  {
    name: 'internet',
    value: 57,
  },
  {
    name: 'car insurance',
    value: 290,
  },
  { name: 'spotify', value: 40 },
  { name: 'ארנונה', value: 120 },
  { name: 'electricity', value: 225 },
  { name: 'water', value: 70 },
  { name: 'weed', value: 800 },
  { name: 'fuel', value: 300 },
  { name: 'food supplies', value: 800 },
  { name: 'eating outside', value: 500 },
  { name: 'hangouts', value: 600 },
  { name: 'guitar lessons', value: 540 },
];
const yearlyExpenses: Expense[] = [
  { name: 'car', value: 5000 },
  { name: 'big events', value: 2400 },
  { name: 'flights', value: 20000 },
  { name: 'Shopping', value: 7000 },
  { name: 'Health', value: 2000 },
];

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  monthlyExpenses$: BehaviorSubject<Expense[]> = new BehaviorSubject(
    monthlyExpenses
  );
  yearlyExpenses$: BehaviorSubject<Expense[]> = new BehaviorSubject(
    yearlyExpenses
  );
}
