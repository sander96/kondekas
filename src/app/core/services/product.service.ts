import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Product } from '../models/product.model'
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class ProductService {

  private productUrl = 'api/product/'

  constructor(private http: HttpClient,
              private translate: TranslateService) { }

  getProductsByPath(category: string, subCategory: string) {
    //Check for errors
    let headers = new HttpHeaders({ 'Accept-Language': this.translate.currentLang });

    return this.http.get<Product[]>(this.productUrl + encodeURIComponent(category)
        +'/' + encodeURIComponent(subCategory), {
      headers: headers,
      params: { 'lang': this.translate.currentLang }
    });
  }
}
