import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    if(this.authService.getRole == 'admin' && this.authService.isAuthenticated)  {
      console.log("Admin login");
      return true;
    }

    else if (this.authService.isAuthenticated)  {
      console.log("Other login");
      this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
      return false;
    }

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}