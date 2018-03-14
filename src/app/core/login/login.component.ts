import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

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
              public translate: TranslateService) { }

  ngOnInit()  {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogIn(form: NgForm) {
    if (form.valid) {
      this.authService.authenticate(this.email, this.password)
          .subscribe(
              response => {
                if (response) {
                  this.router.navigateByUrl(this.returnUrl);
                }
              },
              err => {
                console.log("Error");
                console.log(err);
              });
    }
  }
}