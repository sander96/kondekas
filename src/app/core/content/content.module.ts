import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http"
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { ProductDisplayComponent } from "./productDisplay/productDisplay.component";
import { ContentComponent } from "./content.component";
import { ProductService } from '../services/product.service';
import { TranslateModule } from "@ngx-translate/core";

const contentRouts: Routes = [
  {path: ':category/:subcategory', component: ContentComponent}
];

@NgModule({
  imports: [HttpClientModule, CommonModule, RouterModule.forChild(contentRouts),
    TranslateModule.forChild()],
  declarations: [ContentComponent, ProductDisplayComponent],
  providers: [ProductService]
})
export class ContentModule { }