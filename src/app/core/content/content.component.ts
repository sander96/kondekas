import { Component } from "@angular/core";
import { Product } from "../models/product.model";
import { ProductService } from "../services/product.service";
import { ActivatedRoute } from "@angular/router";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-content',
  moduleId: module.id,
  templateUrl: './content.component.html'
})
export class ContentComponent {
  products: Array<Product>;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              public translate: TranslateService,
              title: Title,
              meta: Meta) {
    translate.onLangChange.subscribe((params: LangChangeEvent) => {
      this.ngOnInit();
    });

    title.setTitle('Products');

    meta.addTags([
      { name: 'author',   content: 'kondekas.herokuapp.com'},
      { name: 'keywords', content: 'products page'},
      { name: 'description', content: 'This page page displays the selected products.' }
    ]);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let category =  params.get('category')
      let subCategory = params.get('subcategory');
      this.productService.getProductsByPath(category, subCategory).subscribe(p => this.products = p);
    });
  }
}