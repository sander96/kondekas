import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Product } from '../models/product.model';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CartService {

  private cart = new BehaviorSubject<Map<Product, number>>(new Map());
  currentCart = this.cart.asObservable();

  update = new Map<Product, number>();

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {
    let testProducts: Observable<Product[]>;
    let temp = new Map<Product, number>();

    let params = new HttpParams().set('albumId', '1');
    testProducts = this.http.get<Product[]>(this.ROOT_URL + '/photos', { params });

    for (let i=0;i<4;i++) {
      testProducts.subscribe(products => {
        temp.set(products[i], 1);
      })
    }
    this.cart.next(temp);
  }

  changeQuantity(product: Product, quantity: number): void  {
    this.update=this.cart.getValue();
    this.update.set(product, quantity);
    this.cart.next(this.update);
  }

  addToCart(productToAdd: Product): void {
    this.update=this.cart.getValue();
    this.update.set(productToAdd, 1);
    this.cart.next(this.update);
  }

  removeFromCart(productToRemove: Product): void  {
    this.update=this.cart.getValue();
    this.update.delete(productToRemove);
    this.cart.next(this.update);
  }
}