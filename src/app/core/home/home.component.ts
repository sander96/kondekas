import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-home',
  moduleId: module.id,
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';

  numberOfProducts = 3;

  productsTop: Observable<testProduct[]>;
  productsPopular: Observable<testProduct[]>;
  productsFeatured: Observable<testProduct[]>;
  productsRecommended: Observable<testProduct[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let params = new HttpParams().set('albumId', '1');
    this.productsTop = this.http.get<testProduct[]>(this.ROOT_URL + '/photos', { params });
    
    params = new HttpParams().set('albumId', '2');
    this.productsPopular = this.http.get<testProduct[]>(this.ROOT_URL + '/photos', { params });
    
    params = new HttpParams().set('albumId', '3');
    this.productsFeatured = this.http.get<testProduct[]>(this.ROOT_URL + '/photos', { params });
    
    params = new HttpParams().set('albumId', '4');
    this.productsRecommended = this.http.get<testProduct[]>(this.ROOT_URL + '/photos', { params });
  }
}

export class testProduct  {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}