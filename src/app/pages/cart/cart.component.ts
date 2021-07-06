import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';
import { IProductCart } from 'src/app/models/iproduct-cart';
import { ProductCarts } from 'src/app/models/product-carts';
import { StatusCart } from 'src/app/models/status-cart.enum';
import { CartSummary } from 'src/app/theme/shared/components/cart-summary/cart-summary.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartSummary!: CartSummary;
  current = 1;
  isSaving = false;
  isSmallScreen = false;
  products$: Observable<IProductCart[]>;
  Subs: Subscription;
  user$: Observable<any | null>;



  constructor(
    private authService: AuthService,
    public cartService: CartService,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.resetSummary();
    this.user$ = this.authService.hasUser();
    this.products$ = this.cartService.cart$
    this.Subs = this.products$.subscribe(data => this.calculateValues(data));
    this.breakpointObserver.observe([
      '(max-width: 426px)'
    ]).subscribe(result => this.isSmallScreen = result.matches);
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

    if (!this.cartService.cart) {
      this.cartService.cart = {
        id: '-1',
        status: StatusCart.pending
      }
    }

    try {
      (this.cartService.cart.id == '-1')
        ? await this.newCart()
        : await this.editCart()

      const products = await this.getProducts(this.cartService.cart.id);
      products.forEach(async product => {
        await this.cartService.saveProductCarts(product)
      });
      await this.cartService.updateCart(this.cartService.cart);
      this.current = 2;
    } catch (error) {
      console.log(error)
    }
    this.isSaving = false;
  }

  async newCart() {
    const response = await this.cartService.createCart(this.cartService.cart)
    this.cartService.cart.id = response.id;
  }

  async editCart() {
    const ids = await this.cartService.getProductsOfCart(this.cartService.cart.id)

    ids.forEach(async id => {
      await this.cartService.deleteProductOfCart(id)
    })

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
    this.cartService.cart.status = StatusCart.completed;
    this.cartService.updateCart(this.cartService.cart)
      .then(() => {
        this.cartService.clearCart();
        this.current = 3;
      })
      .finally(() => this.isSaving = false)
  }

}