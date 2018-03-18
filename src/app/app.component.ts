import { Component } from '@angular/core';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  showSidebar: boolean = false;

  constructor(public translate: TranslateService) {
    translate.addLangs(["en", "et"]);
    translate.setDefaultLang('en');

    let lang = localStorage.getItem('language');
    translate.use(localStorage.getItem('language') ? lang : 'en');

    translate.onLangChange.subscribe((params: LangChangeEvent) => {
      localStorage.setItem('language', params.lang);
    });
  }

  recieveSidebarChange(event: boolean) {
    this.showSidebar = event;
  }
}
