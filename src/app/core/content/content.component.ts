import { Component } from "@angular/core";
import { Product } from "../models/product.model";
import { ProductService } from "../services/product.service";
import { ActivatedRoute } from "@angular/router";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-content',
  moduleId: module.id,
  templateUrl: './content.component.html'
})
export class ContentComponent {
  products: Array<Product>;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              public translate: TranslateService) {
    translate.onLangChange.subscribe((params: LangChangeEvent) => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let category =  params.get('category')
      let subCategory = params.get('subcategory');
      this.productService.getProductsByPath(category, subCategory).subscribe(p => this.products = p);
    });
  }
}