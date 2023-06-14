import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient, private authService : AuthService) { }

  getUser() : Observable<User[]>{
    const headers = new HttpHeaders({
      Authorization: `Bearer `
    });

    return this.http.get<User[]>(`${this.authService.usersUlr}`,{headers});
  }

}
