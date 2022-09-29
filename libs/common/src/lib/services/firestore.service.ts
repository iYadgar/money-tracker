import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { COLLECTIONS } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  createDocument<T>(collection: COLLECTIONS, item: T) {
    return this.firestore.collection<T>(collection).add(item);
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
}
