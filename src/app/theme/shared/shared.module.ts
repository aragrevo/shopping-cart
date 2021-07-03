import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';


@NgModule({
  declarations: [ProductItemComponent],
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzStatisticModule,
    NzImageModule
  ],
  exports: [
    ProductItemComponent,
  ]
})
export class SharedModule { }
