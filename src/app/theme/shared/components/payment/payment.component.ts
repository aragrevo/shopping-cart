import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartSummary } from '../cart-summary/cart-summary.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @Input()
  summary!: CartSummary;
  @Input() isSaving: boolean = false;
  @Input()
  cart!: Cart;
  @Input()
  user!: any | null;

  @Output() onBack: EventEmitter<boolean> = new EventEmitter();
  @Output() onPay: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  handleBack() {
    this.onBack.emit(true);
  }
  handlePay() {
    this.onPay.emit(true);
  }

}
