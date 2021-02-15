import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(public router: Router) { }
  private userStateChangeSource = new BehaviorSubject<boolean>(false);
  userStateChange = this.userStateChangeSource.asObservable();

  isUserLoggedIn(){
    return localStorage.getItem("user");
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl("/login");
    this.setUserStateChange(false);
  }
  login(loginForm) {
    const user = {
      username: loginForm.value.username,
      password: loginForm.value.password
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['home']);
    this.setUserStateChange(true);
  }
  setUserStateChange(state) {
    this.userStateChangeSource.next(state);
  }

}
