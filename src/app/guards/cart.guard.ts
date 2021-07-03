import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private notification: NzNotificationService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.hasUser().pipe(
      map(user => {
        console.log(user);
        return user === null ? false : true
      }),
      tap(hasUser => {
        if (!hasUser) {
          this.createBasicNotification()
        }
        return hasUser;
      }),
    );
  }

  createBasicNotification(): void {
    this.notification
      .create(
        'warning',
        'Información',
        'Debe iniciar sesión para acceder al carrito de compras'
      )
      .onClick.subscribe(() => {
        console.log('notification clicked!');
      });
  }

}
