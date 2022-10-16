import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentData,
  QueryFn,
} from '@angular/fire/compat/firestore';
import { COLLECTIONS } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  createDocument<T>(collection: COLLECTIONS, item: Partial<T>) {
    return this.firestore.collection<T>(collection).add(item as T);
  }
  getCollection<T>(
    collection: COLLECTIONS,
    queryFn?: QueryFn,
    idField?: string
  ) {
    return this.firestore
      .collection<T>(collection, queryFn)
      .valueChanges({ idField: idField || 'id' });
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
    const batch = this.firestore.firestore.batch();
    const sampleRef = this.firestore.firestore.collection(collection);
    data.forEach((value) => {
      const id = sampleRef.doc().id;
      batch.set(sampleRef.doc(id), value);
    });

    await batch.commit();
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
