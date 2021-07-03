import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment';
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
    return this.db.collection<IProduct>(this.collection, r => r.limit(12)).snapshotChanges().pipe(
      map(data => data.map(x => x.payload.doc.data()))
    )
  }
}
