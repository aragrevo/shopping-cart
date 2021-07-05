import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { IconsProviderModule } from 'src/app/icons-provider.module';

import { HeaderComponent } from './components/header/header.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { RegisterComponent } from './components/register/register.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FilterProductsPipe } from './pipes/filter.pipe';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


@NgModule({
  declarations: [ProductItemComponent, HeaderComponent, RegisterComponent, CartListComponent, CartSummaryComponent, PaymentComponent, FilterProductsPipe, ProductDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    IconsProviderModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    FormsModule
  ],
  exports: [
    ProductItemComponent,
    HeaderComponent,
    RegisterComponent,
    CartListComponent,
    CartSummaryComponent,
    PaymentComponent,
    FilterProductsPipe
  ]
})
export class SharedModule { }
