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

    meta.addTags([
      { name: 'author',   content: 'kondekas.herokuapp.com'},
      { name: 'keywords', content: 'users page'},
      { name: 'description', content: 'Add, modify and delete the users.' }
    ]);
  }
}