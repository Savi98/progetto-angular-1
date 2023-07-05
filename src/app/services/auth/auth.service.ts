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

  login(user : User){
    localStorage.setItem('user',JSON.stringify({user}));
  }

  setToken(token : string){
    localStorage.setItem('token', token);
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  isAuthenticated(){
    if (localStorage.getItem('user') === null) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
    return this.isLoggedIn;
  }

}
