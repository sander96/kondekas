import { Component } from "@angular/core";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navbar',
  moduleId: module.id,
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

  constructor(public authService: AuthService) { }
}