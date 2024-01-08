import { Injectable } from '@angular/core';
import { User } from '../interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userStream: Observable<User | null>;

  get userStream$() {
    return this._userStream;
  }

  setUserStream(user$: Observable<User | null>) {
    this._userStream = user$;
  }
}
