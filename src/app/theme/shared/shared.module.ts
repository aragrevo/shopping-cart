import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { HeaderComponent } from './components/header/header.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ProductItemComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzCardModule,
    NzButtonModule,
    NzStatisticModule,
    NzImageModule,
    NzAvatarModule,
    NzBadgeModule,
    NzTagModule,
    NzMenuModule,
  ],
  exports: [
    ProductItemComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
