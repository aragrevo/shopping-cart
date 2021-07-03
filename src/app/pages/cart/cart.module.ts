import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    RouterModule,
    CartRoutingModule,
    NzPageHeaderModule
  ]
})
export class CartModule { }
