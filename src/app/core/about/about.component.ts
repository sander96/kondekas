import { Component } from "@angular/core";
import { AgmCoreModule } from '@agm/core';
import {TranslateService} from "@ngx-translate/core";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-about',
  moduleId: module.id,
  templateUrl: './about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent {
  lat:number = 58.378285;
  lon:number = 26.7144265;
  zoom:number = 16;

  constructor(public translate: TranslateService,
              title: Title,
              meta: Meta) {
    title.setTitle('About');

    meta.addTags([
      { name: 'author',   content: 'kondekas.herokuapp.com'},
      { name: 'keywords', content: 'about page'},
      { name: 'description', content: 'This page gives information about Kondekas webpage.' }
    ]);
  }
}