import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Observable } from "rxjs/Observable";
import { CartService } from '../../services/cart.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-cart',
  moduleId: module.id,
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart = new Map<Product, number>();

  constructor(private cartService: CartService,
              public translate: TranslateService,
              title: Title,
              meta: Meta) {
    translate.onLangChange.subscribe((params: LangChangeEvent) => {
      this.ngOnInit();
    });

    title.setTitle('Cart');

    meta.updateTag({ name: 'author', content: 'kondekas.herokuapp.com'}, 'name=author');
    meta.updateTag({ name: 'keywords', content: 'your shopping cart'}, 'name=keywords');
    meta.updateTag({ name: 'description', content: 'Here are all the selected products.' },
        'name=description');
  }

  ngOnInit() {
    this.cartService.currentCart.subscribe(cart => this.cart = cart);
  }

  getKeys(): Product[]  {
    return Array.from(this.cart.keys());
  }

  changeQuantity(product: Product, quantity: number): void  {
    this.cartService.changeQuantity(product, quantity);
  }

  /*addToCart(productToAdd: Product): void {
    this.cartService.addToCart(productToAdd);
  }*/

  removeFromCart(productToRemove: Product): void  {
    this.cartService.removeFromCart(productToRemove);
  }
}
