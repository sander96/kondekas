import {Component} from "@angular/core";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  moduleId: module.id,
  templateUrl: 'orders.component.html'
})
export class OrdersComponent {
  constructor(title: Title,
              meta: Meta) {

    title.setTitle('Orders');

    meta.updateTag({ name: 'author', content: 'kondekas.herokuapp.com'}, 'name=author');
    meta.updateTag({ name: 'keywords', content: 'orders page'}, 'name=keywords');
    meta.updateTag({ name: 'description', content: 'View the orders and mark orders completed.' },
        'name=description');
  }
}