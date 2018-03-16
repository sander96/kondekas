import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from '../models/product.model'

@Injectable()
export class ProductService {

  private productUrl = 'api/product/'

  constructor(private http: HttpClient) { }

  getProductsByPath(category: string, subCategory: string) {
    //Check for errors
    return this.http.get<Product[]>(this.productUrl + encodeURIComponent(category)
        +'/' + encodeURIComponent(subCategory));
  }
}
