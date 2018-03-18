import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../../models/product.model";
import { Category } from "../../models/category.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ProductService} from "../../services/product.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'productDisplay',
  moduleId: module.id,
  templateUrl: './productDisplay.component.html'
})
export class ProductDisplayComponent implements OnInit {
  @Input() productsToDisplay: Array<Product>;
  viewStyle = true;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private productService: ProductService,
              public authService: AuthService,
              public translate: TranslateService) { }

  ngOnInit() {
    this.productsToDisplay=new Array;
  }

  toggleGridView()  {
    this.viewStyle=true;
  }

  toggleListView()  {
    this.viewStyle=false;
  }

  deleteProduct(product: Product) {
    this.route.paramMap.subscribe(paramMap => {
      let category =  encodeURIComponent(paramMap.get('category'));
      let subcategory = encodeURIComponent(paramMap.get('subcategory'));
      let productId = encodeURIComponent(product.productId);

      let body = {
        subcategoryId: product.subcategoryId
      };

      this.http.delete('api/product/' + category + '/'
          + subcategory + '/' + productId, { params: body, responseType: "json"}).subscribe();

      this.productService.getProductsByPath(category, subcategory)
          .subscribe(p => this.productsToDisplay = p);
    });
  }

  getEncodedImagePath(url: string): string {
    let urlParts = url.split(/\//);
    let result = '';
    urlParts.forEach((part, index) => {
      result += encodeURIComponent(part);

      if (index !== urlParts.length - 1) {
        result += '/'
      }
    });

    return result;
  }

}