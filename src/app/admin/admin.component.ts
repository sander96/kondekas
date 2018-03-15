import { Component, OnInit } from "@angular/core";
import { AuthService } from "../core/services/auth.service";

@Component({
  moduleId: module.id,
  templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit{ 
  private isAdmin: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit()  {
    this.isAdmin = this.authService.getRole=='admin';
  }
}