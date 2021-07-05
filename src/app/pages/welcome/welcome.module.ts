import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { WelcomeComponent } from './welcome.component';


@NgModule({
  imports: [
    WelcomeRoutingModule,
    CommonModule,
    NgZorroAntdModule,
    SharedModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
