import { CartGuard } from './guards/cart.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { ShoppingComponent } from './theme/layout/shopping/shopping.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
      },
    ]
  },
  {
    path: '',
    component: ShoppingComponent,
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      {
        path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'cart',
        canActivate: [CartGuard],
        loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
