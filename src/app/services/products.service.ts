import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'

import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly collection = 'products'

  constructor(
    private db: AngularFirestore,
  ) { }

  getAllProducts() {
    return this.db.collection<IProduct>(this.collection, r => r.limit(24)).snapshotChanges().pipe(
      map(data => data.map(x => x.payload.doc.data()))
    )
  }
}
