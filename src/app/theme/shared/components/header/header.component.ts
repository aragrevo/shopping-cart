import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  total$: Observable<number>;
  user$: Observable<any | null>

  constructor(
    private cartService: CartService,
    private authService: AuthService,
  ) {
    this.total$ = this.cartService.cart$.pipe(map(products => products.length));
    this.user$ = this.authService.hasUser();
  }

  ngOnInit(): void {
  }


}
