import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../models/iproduct';
import { IProductCart } from '../models/iproduct-cart';

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

  constructor() { }

  addProductToCart(product: IProduct) {
    this.products = [...this.products, product];
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
}
