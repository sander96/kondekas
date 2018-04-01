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

  constructor() { }

  changeQuantity(product: Product, quantity: number): void  {
    this.update=this.cart.getValue();
    this.update.set(product, quantity);
    this.cart.next(this.update);
  }

  addToCart(productToAdd: Product): void {
    console.log(productToAdd);
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