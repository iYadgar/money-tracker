import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';
import { Category } from '../interface';
import { COLLECTIONS } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestoreService: FirestoreService) {}

  get categories$(): Observable<Category[]> {
    return this.firestoreService.getCollection<Category>(
      COLLECTIONS.CATEGORIES
    );
  }

  async createCategory(name: string, isYearly = false) {
    return this.firestoreService.createDocument<Category>(
      COLLECTIONS.CATEGORIES,
      {
        name,
        isYearly,
      }
    );
  }
}
