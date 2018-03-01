import {Component, OnInit} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Product } from "../../models/product.model";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-productDisplay',
  moduleId: module.id,
  templateUrl: './productDisplay.component.html'
})
export class ProductDisplayComponent implements OnInit{
  products: Observable<Product[]>;
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let params = new HttpParams().set('albumId', '1');
    this.products = this.http.get<Product[]>(this.ROOT_URL + '/photos', { params });
  }
}