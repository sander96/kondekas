import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PurchaseComponent } from "./purchase.component";
import { CartComponent } from "./cart/cart.component";
import { PaymentComponent } from "./payment/payment.component";

import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@NgModule({
  imports: [BrowserModule],
  declarations: [PurchaseComponent, CartComponent, PaymentComponent],
  exports: [PurchaseComponent],
  providers: [CartService, AuthService]
})
export class PurchaseModule { }