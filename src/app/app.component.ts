import { Component } from '@angular/core';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {Meta, Title} from "@angular/platform-browser";
import { DeviceDetectorService } from 'ngx-device-detector';
import { StatisticsService } from './core/services/statistics.service';
import { Stats } from "./core/models/stats.model";

@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  showSidebar: boolean = false;

  constructor(public translate: TranslateService, private deviceService: DeviceDetectorService, private statsService: StatisticsService) {
    translate.addLangs(["en", "et"]);
    translate.setDefaultLang('en');

    let lang = localStorage.getItem('language');
    translate.use(localStorage.getItem('language') ? lang : 'en');

    translate.onLangChange.subscribe((params: LangChangeEvent) => {
      localStorage.setItem('language', params.lang);
    });

    let deviceInfo = deviceService.getDeviceInfo();
    statsService.sendStatistics(deviceInfo.os+' '+deviceInfo.os_version, deviceInfo.browser+' '+deviceInfo.browser_version)
      .subscribe(response =>  {
        if (response) {
          console.log("Statistics send");
          console.log(deviceInfo.os+' '+deviceInfo.os_version);
          console.log(deviceInfo.browser+' '+deviceInfo.browser_version);
        }
      });
  }

  recieveSidebarChange(event: boolean) {
    this.showSidebar = event;
  }
}
