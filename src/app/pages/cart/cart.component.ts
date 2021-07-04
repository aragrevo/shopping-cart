import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { IProductCart } from 'src/app/models/iproduct-cart';
import { Cart } from 'src/app/models/cart';
import { StatusCart } from 'src/app/models/status-cart.enum';
import { ProductCarts } from 'src/app/models/product-carts';
import { CartSummary } from 'src/app/theme/shared/components/cart-summary/cart-summary.component';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  user$: Observable<any | null>;
  products$: Observable<IProductCart[]>;
  cartSummary!: CartSummary;
  Subs: Subscription;
  current = 1;
  isSaving = false;
  cart!: Cart;



  constructor(
    private authService: AuthService,
    private cartService: CartService,
  ) {
    this.resetSummary();
    this.user$ = this.authService.hasUser();
    this.products$ = this.cartService.cartMapped$
    this.Subs = this.products$.subscribe(data => this.calculateValues(data));
  }
  ngOnDestroy(): void {
    this.Subs.unsubscribe();
  }

  ngOnInit(): void {
  }

  onChangeQuantity(product: IProductCart) {
    this.cartService.updateProductToCart(product);
  }

  handleRemoveProduct(productId: number) {
    this.cartService.removeProductToCart(productId)
  }

  resetSummary() {
    this.cartSummary = { delivery: 0, discount: 0, subtotal: 0, total: 0 };
  }

  calculateValues(data: IProductCart[]) {
    this.resetSummary();
    const summary = data.reduce((acc, item) => {
      acc.subtotal = acc.subtotal + (item.Quantity * item.Price);
      acc.discount = -acc.subtotal / 10;
      acc.total = acc.subtotal + acc.discount;
      return acc
    }, this.cartSummary);

    this.cartSummary = { ...summary };
  }

  async handleFinish() {
    if (this.cartSummary.total == 0) {
      return;
    }

    this.isSaving = true;

    if (!this.cart) {
      this.cart = {
        id: '-1',
        status: StatusCart.pending
      }
    }

    // TODO: al actualizar se deben traer de firebase
    try {
      if (this.cart.id == '-1')
        await this.newCart();

      const products = await this.getProducts(this.cart.id);
      products.forEach(async product => {
        await this.cartService.saveProductCarts(product)
      });
      await this.cartService.updateCart(this.cart);
      this.current = 2;
    } catch (error) {
      console.log(error)
    }
    this.isSaving = false;
  }

  async newCart() {
    const response = await this.cartService.createCart(this.cart)
    this.cart.id = response.id;
  }

  getProducts(cart_id: string): Promise<ProductCarts[]> {
    return new Promise((resolve) => {
      this.products$.subscribe(products => {
        const productCarts = products.map((product) => {
          return {
            product_id: product.id,
            cart_id,
            quantity: product.Quantity
          }
        })
        resolve(productCarts)
      }).unsubscribe()
    })
  }

  handleBack() {
    this.current = 1;
  }
  handlePay() {
    this.isSaving = true;
    this.cart.status = StatusCart.completed;
    this.cartService.updateCart(this.cart)
      .then(() => {
        this.cartService.clearCart();
        this.current = 3;
      })
      .finally(() => this.isSaving = false)
  }

}
