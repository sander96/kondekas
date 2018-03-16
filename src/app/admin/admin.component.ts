import { Component, OnInit } from "@angular/core";
import { AuthService } from "../core/services/auth.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  moduleId: module.id,
  templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit{ 
  private isAdmin: boolean;

  constructor(private authService: AuthService,
              public translate: TranslateService) { }

  ngOnInit()  {
    this.isAdmin = this.authService.getRole=='admin';
  }
}