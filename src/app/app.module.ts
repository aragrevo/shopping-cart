import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule } from './ng-zorro-antd.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import en from '@angular/common/locales/en';
import { ShoppingComponent } from './theme/layout/shopping/shopping.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { environment } from 'src/environments/environment';
import { SharedModule } from './theme/shared/shared.module';
import { LoginModule } from './pages/login/login.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ShoppingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    LoginModule,
    SharedModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
