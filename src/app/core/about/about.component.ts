import { Component } from "@angular/core";
import { AgmCoreModule } from '@agm/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-about',
  moduleId: module.id,
  templateUrl: './about.component.html',
  styles: ['agm-map {height: 300px;}']
})
export class AboutComponent {
  lat:number = 58.378285;
  lon:number = 26.7144265;
  zoom:number = 16;

  constructor(public translate: TranslateService) { }
}