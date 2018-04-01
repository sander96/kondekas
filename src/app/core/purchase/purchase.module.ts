import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PurchaseComponent } from "./purchase.component";
import { CartComponent } from "./cart/cart.component";
import { PaymentComponent } from "./payment/payment.component";

import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [BrowserModule, RouterModule, TranslateModule.forChild()],
  declarations: [PurchaseComponent, CartComponent, PaymentComponent],
  exports: [PurchaseComponent, TranslateModule],
  providers: [CartService, AuthService]
})
export class PurchaseModule { }