import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from 'ng-zorro-antd/table';
import { AuthService } from 'src/app/services/auth.service';
import { IProduct } from 'src/app/models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { IProductCart } from 'src/app/models/iproduct-cart';
import { map } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart';
import { StatusCart } from 'src/app/models/status-cart.enum';
import { ProductCarts } from 'src/app/models/product-carts';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn?: NzTableSortFn | null;
  sortDirections?: NzTableSortOrder[];
}

interface CartSummary {
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
}

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
  current = 2; //TODO:
  isSaving = false;

  listOfColumns: ColumnItem[] = [
    {
      name: 'Producto',
      sortOrder: null,
      sortFn: (a: IProductCart, b: IProductCart) => a.nombre.localeCompare(b.nombre),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Precio',
      sortOrder: 'descend',
    },
    {
      name: 'Cantidad',
      sortOrder: null,
    },
    {
      name: 'Subtotal',
      sortOrder: null,
    }
  ];

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

    let cart: Cart = {
      id: '-1',
      status: StatusCart.pending
    }

    try {
      const response = await this.cartService.createCart(cart)
      cart.id = response.id;
      const products = await this.getProducts(cart.id);
      products.forEach(async product => {
        await this.cartService.saveProductCarts(product)
      });
      await this.cartService.updateCart(cart);
      this.current = 2;
    } catch (error) {
      console.log(error)
    }
    this.isSaving = false;
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

}
