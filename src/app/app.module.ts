import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {ContentModule} from "./core/content/content.module";
import {PurchaseModule} from './core/purchase/purchase.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from "./navigation/navbar/navbar.component";
import { AboutComponent } from "./core/about/about.component";
import { ContentComponent } from "./core/content/content.component";
import { LoginComponent } from "./core/login/login.component";
import { RegisterComponent } from "./core/register/register.component";
import { HomeComponent } from './core/home/home.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { PurchaseComponent } from './core/purchase/purchase.component';

import { CategoriesService } from './core/services/categories.service';
import { AuthService } from "./core/services/auth.service";

// Google maps
import { AgmCoreModule } from '@agm/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'content', component: ContentComponent},
  {path: 'cart', component: PurchaseComponent},
  {path: 'payment', component: PurchaseComponent},
  {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule'}
];

@NgModule({
  declarations: [
    AppComponent, AboutComponent, LoginComponent, RegisterComponent, HomeComponent, NavbarComponent, SidebarComponent
  ],
  imports: [
    ContentModule, PurchaseModule, BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCp-1ezC2edFiAZO6Rxvtu9IZ5hVsmEQWs'}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [CategoriesService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
