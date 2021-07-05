import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FilterProductsPipe } from 'src/app/theme/shared/pipes/filter.pipe';
import { WelcomeComponent } from './welcome.component';


@NgModule({
  imports: [
    WelcomeRoutingModule,
    CommonModule,
    NgZorroAntdModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  providers: [FilterProductsPipe]
})
export class WelcomeModule { }
