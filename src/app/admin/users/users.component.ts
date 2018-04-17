import { Component } from "@angular/core";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  moduleId: module.id,
  templateUrl: 'users.component.html'
})
export class UsersComponent {
  constructor(title: Title,
              meta: Meta) {

    title.setTitle('Users');

    meta.updateTag({ name: 'author', content: 'kondekas.herokuapp.com'}, 'name=author');
    meta.updateTag({ name: 'keywords', content: 'users page'}, 'name=keywords');
    meta.updateTag({ name: 'description', content: 'Add, modify and delete the users.' },
        'name=description');
  }
}