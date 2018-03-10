import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CartComponent } from './cart/cart.component'
import { CartService } from '../services/cart.service';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
})
export class PurchaseComponent implements OnInit {
  router: Router;
  cart = new Map<Product, number>();
  totalCost: number;
  inCart: boolean;

  constructor(private _router: Router, private cartService: CartService, public authService: AuthService) {
    this.router = _router
  }

  ngOnInit() {
    this.totalCost=0;

    if (this.getRoute() === "/cart")  this.inCart=true;
    else if (this.getRoute() === "/payment")  this.inCart=false;

    this.cartService.currentCart.subscribe(cart => this.cart = cart);
  }

  getButtonText(): string {
    if (this.inCart)  return 'Proceed to payment';
    else return 'Back to cart';
  }

  getKeys(): Product[]  {
    return Array.from(this.cart.keys());
  }

  getRoute(): string  {
    return this.router.url;
  }

  changeContent() {
    this.inCart = !this.inCart;
  }
}
