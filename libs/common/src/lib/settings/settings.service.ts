import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  currencyType$: BehaviorSubject<string> = new BehaviorSubject<string>('ILS');

  setCurrency(currency: string) {
    this.currencyType$.next(currency);
  }
}
