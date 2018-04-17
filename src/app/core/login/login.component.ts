import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  moduleId: module.id,
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public email: string;
  public password: string;
  public returnUrl: string;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              public translate: TranslateService,
              title: Title,
              meta: Meta) {
    title.setTitle('Login');

    meta.updateTag({ name: 'author', content: 'kondekas.herokuapp.com'}, 'name=author');
    meta.updateTag({ name: 'keywords', content: 'login page'}, 'name=keywords');
    meta.updateTag({ name: 'description', content: 'Authentication page.' }, 'name=description');
  }

  ngOnInit()  {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogIn(form: NgForm) {
    if (form.valid) {
      
      this.authService.authenticate(this.email, this.password)
          .subscribe(
              response => {
                if (response) {
                  this.checkUserRole();
                }
              },
              err => {
                console.log("Error");
                console.log(err);
              });
    }
  }

  checkUserRole() {
    this.authService.checkUserStatus()
      .subscribe(response =>  {
          this.router.navigateByUrl(this.returnUrl);
      },
      err => {
        
      });
  }
}