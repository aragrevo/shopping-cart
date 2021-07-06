import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map, tap, first } from 'rxjs/operators';
import { Cart } from '../models/cart';
import { IProduct } from '../models/iproduct';
import { IProductCart } from '../models/iproduct-cart';
import { ProductCarts } from '../models/product-carts';
import { StatusCart } from '../models/status-cart.enum';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productsInCart: IProductCart[] = [];
  private _cart = new BehaviorSubject<IProductCart[]>([]);

  cart!: Cart;
  cart$ = this._cart.asObservable();

  constructor(
    private db: AngularFirestore,
  ) { }


  private transmitter() {
    this._cart.next(this.productsInCart);
  }

  clearCart() {
    this.productsInCart = [];
    this.cart = {
      id: '-1',
      status: StatusCart.pending
    }
    this.transmitter();
  }

  addProductToCart(product: IProduct) {
    const hasProduct = this.productsInCart.find(p => p.id === product.id);
    if (hasProduct) {
      hasProduct.Quantity = hasProduct.Quantity + 1;
    } else {
      this.productsInCart.push({
        ...product,
        Quantity: 1,
        Price: product.sku % 1000
      });
    }
    this.transmitter();
  }

  removeProductToCart(productId: number) {
    this.productsInCart = this.productsInCart.filter(p => p.id !== productId);
    this.transmitter();
  }

  updateProductToCart(product: IProductCart) {
    const hasProduct = this.productsInCart.find(p => p.id === product.id);
    if (hasProduct) {
      hasProduct.Quantity = product.Quantity;
    }
    this.transmitter();
  }

  createCart(cart: Cart) {
    return this.db.collection<Cart>('carts').add(cart)
  }

  updateCart(cart: Cart) {
    return this.db.collection<Cart>('carts').doc(cart.id).set(cart);
  }

  saveProductCarts(productCard: ProductCarts) {
    return this.db.collection<ProductCarts>('product_carts').add(productCard)
  }

  getProductsOfCart(cartId: string) {
    return this.db.collection<ProductCarts>("product_carts", r => r.where("cart_id", "==", cartId))
      .snapshotChanges()
      .pipe(
        map(data => data.map(x => x.payload.doc.id)),
        first()
      )
      .toPromise()
  }

  deleteProductOfCart(id: string) {
    return this.db.collection<ProductCarts>('product_carts').doc(id).delete();
  }
}
