import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CartRoutingModule,
    NgZorroAntdModule
  ]
})
export class CartModule { }
