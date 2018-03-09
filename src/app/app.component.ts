import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  showSidebar: boolean = true;

  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  recieveSidebarChange(event: boolean) {
    this.showSidebar = event;
  }
}
