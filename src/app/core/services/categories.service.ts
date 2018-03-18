import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { Category } from '../models/category.model'
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class CategoriesService {

  private categoriesUrl = 'api/category'

  constructor(
    private http: HttpClient,
    private translate: TranslateService) { }

  getCategories(): Observable<Category[]> {
    let httpOptions = new HttpHeaders({
      'Accept-Language': this.translate.currentLang
    });
    return this.http.get<Category[]>(this.categoriesUrl, {
      headers: httpOptions,
      params: { 'lang': this.translate.currentLang }
    });
  }
}
