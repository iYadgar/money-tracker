import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentData,
  DocumentReference,
  QueryFn,
} from '@angular/fire/compat/firestore';
import { COLLECTIONS } from '../enums';
import { UserService } from './user.service';
import {
  firstValueFrom,
  interval,
  lastValueFrom,
  map,
  of,
  switchMap,
  take,
  takeLast,
} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  async createDocument<T extends { user: string }>(
    collection: COLLECTIONS,
    item: Partial<T>
  ): Promise<string | null> {
    try {
      const userData = await firstValueFrom(this.userService.userStream$);
      if (userData) {
        const response = await this.firestore
          .collection<T>(collection)
          .add({ ...item, user: userData?.id || '' } as T);
        return response.id;
      }
      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  getCollection<T>(collection: COLLECTIONS, idField?: string) {
    return this.userService.userStream$.pipe(
      switchMap((user) => {
        if (user?.id) {
          const query: QueryFn = (ref) => ref.where('user', '==', user?.id);
          return this.firestore
            .collection<T>(collection, query)
            .valueChanges({ idField: idField || 'id' });
        }
        return of([]);
      })
    );
  }
  getDocument<T>(collection: COLLECTIONS, id: string, idField?: string) {
    return this.firestore
      .doc<T>(`${collection}/${id}`)
      .valueChanges({ idField: idField || 'id' });
  }

  updateDocument<T>(collection: COLLECTIONS, id: string, data: Partial<T>) {
    return this.firestore.doc<T>(`${collection}/${id}`).update(data);
  }
  deleteDocument<T>(collection: COLLECTIONS, id: string) {
    return this.firestore.doc<T>(`${collection}/${id}`).delete();
  }
  async uploadBatch<T extends DocumentData>(
    collection: COLLECTIONS,
    data: T[]
  ) {
    const userData = await firstValueFrom(this.userService.userStream$);
    if (userData) {
      const batch = this.firestore.firestore.batch();
      const sampleRef = this.firestore.firestore.collection(collection);
      data.forEach((value) => {
        const id = sampleRef.doc().id;
        batch.set(sampleRef.doc(id), { ...value, user: userData.id });
      });

      await batch.commit();
    }
  }
  async batchUpdate<T extends DocumentData>(
    collection: COLLECTIONS,
    data: T[],
    updateValues: Partial<T>
  ) {
    const batch = this.firestore.firestore.batch();
    const sampleRef = this.firestore.firestore.collection(collection);
    data.forEach((value) => {
      if (value['id']) {
        const docRef = sampleRef.doc(value['id']);
        batch.update(docRef, updateValues);
      }
    });
    await batch.commit();
  }
  generateId(): string {
    return this.firestore.createId();
  }
}
