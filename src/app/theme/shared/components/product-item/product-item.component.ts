import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/iproduct';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input()
  product!: IProduct;

  placeholder =
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200';

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  handleAddProduct(selectedProduct: IProduct): void {
    console.log(selectedProduct);
    this.cartService.addProductToCart(selectedProduct)
  }
}
