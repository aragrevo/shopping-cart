import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart';
import { IProduct } from '../models/iproduct';
import { IProductCart } from '../models/iproduct-cart';
import { ProductCarts } from '../models/product-carts';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: IProduct[] = [];
  private productsInCart: IProductCart[] = [];
  private cart = new BehaviorSubject<IProduct[]>([]);
  private cartMapped = new BehaviorSubject<IProductCart[]>([]);

  cart$ = this.cart.asObservable();
  cartMapped$ = this.cartMapped.asObservable();

  constructor(
    private db: AngularFirestore,
  ) { }

  addProductToCart(product: IProduct) {
    this.products = [...this.products, product];
    this.mapProducts();
    this.cart.next(this.products);
  }

  removeProductToCart(productId: number) {
    this.products = this.products.filter(p => p.id !== productId);
    this.mapProducts();
    this.cart.next(this.products);
  }

  updateProductToCart(product: IProductCart) {
    // TODO: al actualizar se cambia el orden
    this.products = this.products.filter(p => p.id !== product.id);
    for (let index = 0; index < product.Quantity; index++) {
      this.products = [...this.products, product];
    }
    this.mapProducts();
    this.cart.next(this.products);
  }

  private mapProducts() {
    const productsCart: IProductCart[] = [];
    this.productsInCart = this.products.reduce((acc, product) => {
      const existedProduct = acc.find(p => p.id === product.id);
      if (existedProduct) {
        existedProduct.Quantity += 1;
        return acc;
      }
      acc.push({
        ...product,
        Quantity: 1,
        Price: product.sku % 1000
      });
      return acc;
    }, productsCart);

    this.cartMapped.next(this.productsInCart);
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
}
