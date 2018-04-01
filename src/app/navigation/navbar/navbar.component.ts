import { Component, Output, EventEmitter, HostListener } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'navbar',
  moduleId: module.id,
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {
  @Output() changeSidebarEvent = new EventEmitter<boolean>();

  showSidebar: boolean = false;
  isXS = false;
  isExpanded = false;

  constructor(public authService: AuthService,
              public translate: TranslateService,
              private router: Router) { }

  onLogOut() {
    this.authService.logOut().subscribe(
        response => {
          if (response) {
            this.router.navigateByUrl('/');
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
    console.log(this.showSidebar);
  }

  expandAndToggle() {
    this.isExpanded = !this.isExpanded;
    this.showSidebar = this.isExpanded;
    this.changeSidebarEvent.emit(this.showSidebar);
  }
}