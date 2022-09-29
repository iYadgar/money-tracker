import { Injectable } from '@angular/core';
import { User } from '@money-tracker/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = {
    name: 'idan',
    id: '34ljkrn3kjr',
  };
}
