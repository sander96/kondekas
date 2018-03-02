import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Product } from '../models/product.model'

@Component({
  selector: 'app-home',
  moduleId: module.id,
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';

  numberOfProducts = 3;

  productsTop: Observable<Product[]>;
  productsPopular: Observable<Product[]>;
  productsFeatured: Observable<Product[]>;
  productsRecommended: Observable<Product[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let params = new HttpParams().set('albumId', '1');
    this.productsTop = this.http.get<Product[]>(this.ROOT_URL + '/photos', { params });
    
    params = new HttpParams().set('albumId', '2');
    this.productsPopular = this.http.get<Product[]>(this.ROOT_URL + '/photos', { params });
    
    params = new HttpParams().set('albumId', '3');
    this.productsFeatured = this.http.get<Product[]>(this.ROOT_URL + '/photos', { params });
    
    params = new HttpParams().set('albumId', '4');
    this.productsRecommended = this.http.get<Product[]>(this.ROOT_URL + '/photos', { params });
  }
}