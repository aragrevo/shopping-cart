import { CartGuard } from './guards/cart.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from './theme/layout/shopping/shopping.component';

const routes: Routes = [
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
      },
      { path: '**', redirectTo: 'welcome' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
