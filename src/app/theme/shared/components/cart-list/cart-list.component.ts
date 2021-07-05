import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProductCart } from 'src/app/models/iproduct-cart';


@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  @Input() products: IProductCart[] = [];

  @Output() onChangeQty: EventEmitter<IProductCart> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();

  isSmallScreen = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
    this.breakpointObserver.observe([
      '(max-width: 426px)'
    ]).subscribe(result => this.isSmallScreen = result.matches);
  }

  ngOnInit(): void {
  }

  onChangeQuantity(data: IProductCart) {
    this.onChangeQty.emit(data)
  }

  handleRemoveProduct(id: number) {
    this.remove.emit(id)
  }

}
