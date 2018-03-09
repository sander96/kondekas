import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  showSidebar: boolean = true;

  constructor() { }

  recieveSidebarChange(event: boolean) {
    this.showSidebar = event;
  }
}
