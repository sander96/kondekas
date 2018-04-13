import { Component, OnInit } from "@angular/core";
import { AuthService } from "../core/services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  moduleId: module.id,
  templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit{ 
  private isAdmin: boolean;

  constructor(private authService: AuthService,
              public translate: TranslateService,
              title: Title,
              meta: Meta) {
    title.setTitle('Admin');

    meta.addTags([
      { name: 'author',   content: 'kondekas.herokuapp.com'},
      { name: 'keywords', content: 'admin page'},
      { name: 'description', content: 'This page is made for administrative purposes.' }
    ]);
  }

  ngOnInit()  {
    this.isAdmin = this.authService.getRole=='admin';
  }
}