import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { IconsProviderModule } from 'src/app/icons-provider.module';

import { HeaderComponent } from './components/header/header.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [ProductItemComponent, HeaderComponent, RegisterComponent],
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
    RegisterComponent
  ]
})
export class SharedModule { }
