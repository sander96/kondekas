import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Product } from '../models/product.model'
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';

  numberOfProducts = 3;

  productsTop: Observable<Product[]>;
  productsPopular: Observable<Product[]>;
  productsFeatured: Observable<Product[]>;
  productsRecommended: Observable<Product[]>;

  constructor(private http: HttpClient,
              title: Title,
              meta: Meta) {
    title.setTitle('Kondekas');

    meta.updateTag({ name: 'author', content: 'kondekas.herokuapp.com'}, 'name=author');
    meta.updateTag({ name: 'keywords', content: 'home page'}, 'name=keywords');
    meta.updateTag({ name: 'description', content: 'This is the main page.' }, 'name=description');
  }

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