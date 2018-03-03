import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {FormsModule} from "@angular/forms";

import {ContentModule} from "./core/content/content.module";

import { AppComponent } from './app.component';
import { NavbarComponent } from "./core/navbar/navbar.component";
import { AboutComponent } from "./core/about/about.component";
import { ContentComponent } from "./core/content/content.component";
import { LoginComponent } from "./core/login/login.component";
import { RegisterComponent } from "./core/register/register.component";
import { HomeComponent } from './core/home/home.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { CategoriesService } from './core/services/categories.service';
import { AuthService } from "./core/services/auth.service";

// Google maps
import { AgmCoreModule } from '@agm/core';
import { CartComponent } from './core/cart/cart.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'content', component: ContentComponent},
  {path: 'cart', component: CartComponent},
  {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule'}
];

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, AboutComponent,
      LoginComponent, RegisterComponent, SidenavComponent, HomeComponent, CartComponent
  ],
  imports: [
    ContentModule, BrowserModule, FormsModule, RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCp-1ezC2edFiAZO6Rxvtu9IZ5hVsmEQWs'})
  ],
  providers: [CategoriesService, AuthService],
  bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule { }
