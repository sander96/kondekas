import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AdminComponent } from "./admin.component";
import { OrdersComponent } from "./orders/orders.component";
import { ProductsComponent } from "./products/products.component";
import { UsersComponent } from "./users/users.component";

const adminRoutes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'users', component: UsersComponent}
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(adminRoutes)],
  declarations: [AdminComponent, OrdersComponent, ProductsComponent, UsersComponent]
})
export class AdminModule {}