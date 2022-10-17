import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';
import { Category } from '../interface';
import { COLLECTIONS } from '../enums';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private firestoreService: FirestoreService,
    private userService: UserService
  ) {}

  get categories$(): Observable<Category[]> {
    return this.firestoreService.getCollection<Category>(
      COLLECTIONS.CATEGORIES
    );
  }

  createCategory(name: string, isYearly = false) {
    return this.firestoreService.createDocument<Category>(
      COLLECTIONS.CATEGORIES,
      {
        name,
        user: this.userService.user.id,
        isYearly,
      }
    );
  }
}
