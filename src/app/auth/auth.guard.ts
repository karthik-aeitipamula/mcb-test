import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../_services/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public Authguardservice: AuthserviceService, public router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkLoginStatus();
  }
  checkLoginStatus() {
    const userData = JSON.parse(this.Authguardservice.isUserLoggedIn());
    if (userData && userData['username'] === 'user' && userData['password'] === 'user') {
      this.Authguardservice.setUserStateChange(true);
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
