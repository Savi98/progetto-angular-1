import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user! : User;

  constructor(private http : HttpClient) {}

  login(token : string){
    localStorage.setItem('token',token);
  }

  logout(){
    localStorage.removeItem('token');
  }


}
