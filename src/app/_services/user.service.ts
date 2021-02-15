import { Injectable } from '@angular/core';
import user_data from '../_helpers/userData';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private data: any;
  constructor() {
    this.data = user_data
  }

  public getUsers() {
    return this.data;
  }
}
