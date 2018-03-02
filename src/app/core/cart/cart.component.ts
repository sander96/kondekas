import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-cart',
  moduleId: module.id,
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';
  cart: Cart;
  testProducts: Observable<Product[]>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let params = new HttpParams().set('albumId', '1');
    this.testProducts = this.http.get<Product[]>(this.ROOT_URL + '/photos', { params });

    this.cart={
      products: []
    };

    for (let i=0;i<4;i++) {
      this.testProducts.subscribe(products => {
        this.addToCart(products[i]);
      })
    }
  }

  addToCart(product: Product): void {
    this.cart.products.push(product);
  }

  removeFromCart(productToRemove: Product): void  {
    let index = this.cart.products.indexOf(productToRemove);
    if (index > -1) {
      this.cart.products.splice(index, 1);
    }
  }

  purchase(cartToPurchase: Cart): void{
    console.log('Purchase');
  }

}
