import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import * as $ from 'node_modules/jquery';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {


  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticated()) {
      $("body").addClass("account-pages sidebar-page")
      return true;
    }
    else {
      // navigate to login page

      this._router.navigate(['']);
      // you can save redirect url so after authing we can move them back to the page they requested
      return false;
    }
  }

}