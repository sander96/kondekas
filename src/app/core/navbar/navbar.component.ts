import { Component } from "@angular/core";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navbar',
  moduleId: module.id,
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

  constructor(public authService: AuthService) { }

  onLogOut() {
    this.authService.logOut().subscribe(
        response => {
          if (response) {
            console.log("Logged out");
          }
        },
        err => {
          console.log("Error");
          console.log(err);
        }
    )
  }
}