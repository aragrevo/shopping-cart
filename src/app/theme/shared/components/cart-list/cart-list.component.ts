import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzTableSortOrder, NzTableSortFn } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { IProductCart } from 'src/app/models/iproduct-cart';


interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn?: NzTableSortFn | null;
  sortDirections?: NzTableSortOrder[];
}

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  @Input() products: IProductCart[] = [];

  @Output() onChangeQty: EventEmitter<IProductCart> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();

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

  constructor() { }

  ngOnInit(): void {
  }

  onChangeQuantity(data: IProductCart) {
    this.onChangeQty.emit(data)
  }

  handleRemoveProduct(id: number) {
    this.remove.emit(id)
  }

}
