import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { ProductDisplayComponent } from "./productDisplay/productDisplay.component";
import { VerticalNavComponent } from "./verticalNav/verticalNav.component";
import { ContentComponent } from "./content.component";

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [ContentComponent, ProductDisplayComponent, VerticalNavComponent],
  exports: [ContentComponent]
})
export class ContentModule { }