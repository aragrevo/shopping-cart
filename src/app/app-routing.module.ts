import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { ShoppingComponent } from './theme/layout/shopping/shopping.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AuthComponent,
  //   children: [

  //     // {
  //     //   path: 'auth',
  //     //   loadChildren: () => import('./views/authentication/authentication.module').then(module => module.AuthenticationModule)
  //     // },
  //   ]
  // },
  {
    path: '',
    component: ShoppingComponent,
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      {
        path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
