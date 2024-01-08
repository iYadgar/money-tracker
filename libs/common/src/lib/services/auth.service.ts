import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { UserService } from './user.service';
import { User } from '../interface';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private userService: UserService,
    private route: Router
  ) {}

  init() {
    this.userService.setUserStream(this.getUserData());
  }
  async login(): Promise<boolean> {
    try {
      await this.fireAuth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  async logout(): Promise<boolean> {
    try {
      await this.fireAuth.signOut();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  getUserData(): Observable<User | null> {
    return this.fireAuth.user.pipe(
      map((user) => {
        if (user) {
          const providerData = user.providerData[0];
          return {
            ...providerData,
            id: providerData?.uid || '',
          } as User;
        }
        return null;
      })
    );
  }
}
