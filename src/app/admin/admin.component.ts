import { Component, OnInit } from "@angular/core";
import { AuthService } from "../core/services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {Meta, Title} from "@angular/platform-browser";
import { DeviceDetectorService } from "ngx-device-detector";

@Component({
  moduleId: module.id,
  templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit{ 
  private isAdmin: boolean;
  deviceInfo = null;

  constructor(private authService: AuthService,
              public translate: TranslateService,
              title: Title,
              private meta: Meta) {
    title.setTitle('Admin');

    meta.updateTag({ name: 'author', content: 'kondekas.herokuapp.com'}, 'name=author');
    meta.updateTag({ name: 'keywords', content: 'admin page'}, 'name=keywords');
    meta.updateTag({ name: 'description', content: 'This page is made for administrative purposes.' },
        'name=description');
  }

  ngOnInit()  {
    this.isAdmin = this.authService.getRole=='admin';
  }
}