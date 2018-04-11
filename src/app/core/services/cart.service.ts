import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Product } from '../models/product.model';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { LoginModel } from '../models/login.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CartService {

  private cart = new BehaviorSubject<Map<Product, number>>(new Map());
  currentCart = this.cart.asObservable();

  update = new Map<Product, number>();

  constructor(private http: HttpClient) { }

  private isProductInCart(product: Product) {
    for (let p of Array.from(this.cart.getValue().keys())) {
      if (p.productId === product.productId) return true;
    }
    return false;
  }

  changeQuantity(product: Product, quantity: number): void  {
    this.update=this.cart.getValue();
    this.update.set(product, quantity);
    this.cart.next(this.update);
  }

  addToCart(productToAdd: Product): void {
    if (!this.isProductInCart(productToAdd)) {
      this.update=this.cart.getValue();
      this.update.set(productToAdd, 1);
      this.cart.next(this.update);
    }
  }

  removeFromCart(productToRemove: Product): void  {
    this.update=this.cart.getValue();
    this.update.delete(productToRemove);
    this.cart.next(this.update);
  }

  sendPurchaseList(): Observable<boolean>  {
    let purchase = new Array();

    this.cart.subscribe(map => {
      map.forEach((val: number, key: Product) => {
        purchase.push([key.productId, val]);
      });
    });

    let body = JSON.stringify(purchase);
    console.log(body);
    
    return this.http.post<LoginModel>('api/purchase',
      body, {headers: new HttpHeaders({'Content-Type': 'application/json'})})
      .pipe(catchError(this.handleError))
      .map(response => {
        if (response.status == 'success') {
          return true;
        }
        return false;
      });
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.status == 200) {
      return Observable.of({status: 'success'});
    }

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return Observable.of({status: 'failure'});
  }
}