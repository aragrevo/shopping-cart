import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LoginModule { }
