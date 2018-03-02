import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  moduleId: module.id,
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{ 

  registerData: RegisterData;
  registrationSuccess: boolean;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit()  {
    this.registerData = {
      name: '',
      email: '',
      password: ''
    }
  }

  onRegister(registerForm: NgForm)  {
    this.authService.register(this.registerData.name, this.registerData.email, this.registerData.password)
    .subscribe(
        response => {
          if (response) {
            this.router.navigateByUrl('/login');
          }
        },
        err => {
          console.log("Error");
          console.log(err);
        });

  }
}

export class RegisterData {
  name: string;
  email: string;
  password: string;
}
