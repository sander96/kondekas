import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { PurchaseModule } from './core/purchase/purchase.module';

import { AuthGuard } from './core/guards/auth.guard';
import { AuthService } from "./core/services/auth.service";

import { AppComponent } from './app.component';
import { NavbarComponent } from "./navigation/navbar/navbar.component";
import { AboutComponent } from "./core/about/about.component";
import { ContentComponent } from "./core/content/content.component";
import { LoginComponent } from "./core/login/login.component";
import { RegisterComponent } from "./core/register/register.component";
import { HomeComponent } from './core/home/home.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { PurchaseComponent } from './core/purchase/purchase.component';
import { NotFound } from './core/notFound/notFound.component';

import { CategoriesService } from './core/services/categories.service';

// Google maps
import { AgmCoreModule } from '@agm/core';
import { ProductService } from './core/services/product.service';
import { WorkerGuard } from './core/guards/worker.guard';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'content', loadChildren: './core/content/content.module#ContentModule'},
  {path: 'cart', component: PurchaseComponent},
  {path: 'payment', component: PurchaseComponent, canActivate: [AuthGuard]},
  {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canActivate: [WorkerGuard]},
  {path: '**', component: NotFound}
];

@NgModule({
  declarations: [
    AppComponent, AboutComponent, LoginComponent, RegisterComponent, HomeComponent, NavbarComponent, SidebarComponent, NotFound
  ],
  imports: [
    PurchaseModule, BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCp-1ezC2edFiAZO6Rxvtu9IZ5hVsmEQWs'}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [CategoriesService, AuthService, ProductService, AuthGuard, WorkerGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
