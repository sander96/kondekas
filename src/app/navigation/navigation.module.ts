import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SearchComponent } from "./search/search.component";

@NgModule({
  declarations: [SidebarComponent, NavbarComponent, SearchComponent]
})

export class NavigationModule {
  
}