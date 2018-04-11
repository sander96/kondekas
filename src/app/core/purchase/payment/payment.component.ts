import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit {

  constructor(public translate: TranslateService, public cartService: CartService) { }

  ngOnInit() {  
  }

  sendPurchaseList(): void  {
    let response = this.cartService.sendPurchaseList();

    if (response) {
      console.log('Purchase successful');
    } else  {
      console.log('Purchase failed');
    }
  }

}
