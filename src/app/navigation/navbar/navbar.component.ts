import { Component, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'navbar',
  moduleId: module.id,
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {
  @Output() changeSidebarEvent = new EventEmitter<boolean>();

  showSidebar: boolean = true;

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

  toggleSidebar() {
    this.showSidebar=!this.showSidebar;
    this.changeSidebarEvent.emit(this.showSidebar);
  }
}