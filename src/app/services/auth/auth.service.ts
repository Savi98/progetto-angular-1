import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user! : User;

  usersUlr = 'https://gorest.co.in/public/v2/users';

  isLoggedIn! : boolean;

  constructor(private http : HttpClient) {}

  login(token : string){
    localStorage.setItem('token',token);
  }

  logout(){
    localStorage.removeItem('token');
  }

  isAuthenticated(){
    if (localStorage.getItem('token') === null) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
    return this.isLoggedIn;
  }

}