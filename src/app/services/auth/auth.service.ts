import { Injectable } from '@angular/core';
import { User } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user! : User;

  usersUlr = 'https://gorest.co.in/public/v2/users';

  isLoggedIn! : boolean;

  constructor() {}

  login(token : string , email : string, name : string){
    localStorage.setItem('token',token);
    localStorage.setItem('email',email);
    localStorage.setItem('name',name);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
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
