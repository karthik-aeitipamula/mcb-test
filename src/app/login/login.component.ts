import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../_services/authservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showError:boolean = false;
  constructor(private formBuilder: FormBuilder, private _authserviceService: AuthserviceService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  submit() {
    if (this.loginForm.invalid) {
      return
    }
    let userData = this.loginForm.value;
    this.showError = false;
    if (userData && userData['username'] === 'user' && userData['password'] === 'user') {
      this._authserviceService.login(this.loginForm)
    } else {
      this.showError = true;
    }
  }

}
