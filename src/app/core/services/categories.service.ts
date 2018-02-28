import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { Category } from '../models/category.model'

@Injectable()
export class CategoriesService {

  private categoriesUrl = 'api/category'

  constructor(
    private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }
}
