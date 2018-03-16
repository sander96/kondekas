import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../../models/product.model";
import { Category } from "../../models/category.model";

@Component({
  selector: 'productDisplay',
  moduleId: module.id,
  templateUrl: './productDisplay.component.html'
})
export class ProductDisplayComponent implements OnInit {
  @Input() productsToDisplay: Array<Product>;
  viewStyle = true;

  constructor() { }

  ngOnInit() {
    this.productsToDisplay=new Array;
  }

  toggleGridView()  {
    this.viewStyle=true;
  }

  toggleListView()  {
    this.viewStyle=false;
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