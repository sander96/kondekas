import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  moduleId: module.id,
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public email: string;
  public password: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  onLogIn(form: NgForm) {
    if (form.valid) {
      this.authService.authenticate(this.email, this.password)
          .subscribe(
              response => {
                if (response) {
                  this.router.navigateByUrl('/');
                }
              },
              err => {
                console.log("Error");
                console.log(err);
              });
    }
  }
}