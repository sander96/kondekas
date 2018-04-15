import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AdminComponent } from "./admin.component";
import { OrdersComponent } from "./orders/orders.component";
import { ProductsComponent } from "./products/products.component";
import { UsersComponent } from "./users/users.component";
import { AdminGuard } from "../core/guards/admin.guard";
import { TranslateModule } from "@ngx-translate/core";
import { StatisticsComponent } from "./statistics/statistics.component";


const adminRoutes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'users', component: UsersComponent, canActivate: [AdminGuard]},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(adminRoutes),
    TranslateModule.forChild()],
  declarations: [AdminComponent, OrdersComponent, ProductsComponent, UsersComponent, StatisticsComponent],
  providers: [AdminGuard]
})
export class AdminModule {}