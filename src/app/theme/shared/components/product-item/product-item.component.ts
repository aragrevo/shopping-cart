import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IProduct } from 'src/app/models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input()
  product!: IProduct;

  quantity$: Observable<number | undefined>;

  constructor(
    private cartService: CartService,
    private drawerService: NzDrawerService
  ) {

    this.quantity$ = this.cartService.cartMapped$.pipe(
      map(products => products.find(product => product.id == this.product?.id)?.Quantity)
    )

  }

  ngOnInit(): void {
  }

  handleAddProduct(selectedProduct: IProduct): void {
    this.cartService.addProductToCart(selectedProduct)
  }

  handleDetail(selectedProduct: IProduct) {
    const drawerRef = this.drawerService.create<ProductDetailComponent, { product: IProduct }, string>({
      nzTitle: selectedProduct.nombre,
      nzContent: ProductDetailComponent,
      nzContentParams: {
        product: selectedProduct
      },
      nzWidth: 348,
      nzBodyStyle: { padding: 0, display: 'flex', flexDirection: 'column' }
    });
  }
}
