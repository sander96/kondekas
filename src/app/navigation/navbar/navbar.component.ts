import { Component, Output, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'navbar',
  moduleId: module.id,
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {
  @Output() changeSidebarEvent = new EventEmitter<boolean>();

  showSidebar: boolean = true;

  constructor(public authService: AuthService,
              public translate: TranslateService) {
    translate.addLangs(["en", "ee"]);
    translate.setDefaultLang('en');
    translate.use('en');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ee/) ? browserLang : 'en');
  }

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