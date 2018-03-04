import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Observable } from "rxjs/Observable";
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  moduleId: module.id,
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart = new Map<Product, number>();

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.currentCart.subscribe(cart => this.cart = cart);
  }

  getKeys(): Product[]  {
    return Array.from(this.cart.keys());
  }

  changeQuantity(product: Product, quantity: number): void  {
    this.cartService.changeQuantity(product, quantity);
  }

  addToCart(productToAdd: Product): void {
    this.cartService.addToCart(productToAdd);
  }

  removeFromCart(productToRemove: Product): void  {
    this.cartService.removeFromCart(productToRemove);
  }
}
