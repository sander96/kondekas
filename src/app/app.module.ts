import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { NavbarComponent } from "./core/navbar/navbar.component";
import { AboutComponent } from "./core/about/about.component";
import { ContentComponent } from "./core/content/content.component";
import {LoginComponent} from "./core/login/login.component";
import {RegisterComponent} from "./core/register/register.component";

// Google maps
import { AgmCoreModule } from '@agm/core';

const appRoutes: Routes = [
  {path: '', component: ContentComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, AboutComponent, ContentComponent,
      LoginComponent, RegisterComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCp-1ezC2edFiAZO6Rxvtu9IZ5hVsmEQWs'})
  ],
  providers: [],
  bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule { }
