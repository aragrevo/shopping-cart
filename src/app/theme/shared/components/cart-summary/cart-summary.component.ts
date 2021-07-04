import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface CartSummary {
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
}

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {

  @Input() cartSummary!: CartSummary;
  @Input() isSaving: boolean = false;
  @Output() finish: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  handleFinish() {
    this.finish.emit(true)
  }

}
