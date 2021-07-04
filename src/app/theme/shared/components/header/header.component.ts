import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzModalService } from 'ng-zorro-antd/modal';

import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  total$: Observable<number>;
  user$: Observable<any | null>;
  isSmallScreen = false;
  customSettingsModal = {
    nzFooter: null,
    nzStyle: { top: '2px' },
    nzBodyStyle: { backgroundColor: '#f0f2f5' }
  }

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private modalService: NzModalService,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.total$ = this.cartService.cart$.pipe(map(products => products.length));
    this.user$ = this.authService.hasUser();
    this.breakpointObserver.observe([
      '(max-width: 425px)'
    ]).subscribe(result => this.isSmallScreen = !result.matches);
  }

  ngOnInit(): void {
  }

  handleLogin() {
    this.modalService.create({
      ...this.customSettingsModal,
      nzContent: LoginComponent,
    });
  }

  handleRegister() {
    this.modalService.create({
      ...this.customSettingsModal,
      nzContent: RegisterComponent,
    });
  }

  handleLogout() {
    this.authService.logout();
  }


}
