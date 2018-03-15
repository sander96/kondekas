import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'notFound',
    moduleId: module.id,
    templateUrl: 'notFound.component.html'
})
export class NotFound   {
    constructor(public translate: TranslateService) { }
}