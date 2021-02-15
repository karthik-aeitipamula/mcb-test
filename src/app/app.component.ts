import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from './_services/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'My Bank App';
  showLogoutButton = false;
  constructor(public _authserviceService: AuthserviceService) { }
  ngOnInit() {
    console.log(this._authserviceService.isUserLoggedIn())
    this._authserviceService.userStateChange.subscribe((value) => {
      this.showLogoutButton = value;
    });
  }
  logout() {
    this._authserviceService.logout();
  }

}
