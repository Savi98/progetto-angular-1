import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { NewUser, User } from 'src/app/models/user/user.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient, private authService : AuthService) { }

  getUser() : Observable<User[]>{
    return this.http.get<User[]>(`${this.authService.usersUlr}`);
  }

  getUsers(pageIndex: number, pageSize: number): Observable<HttpResponse<User[]>> {
    const startIndex = pageIndex * pageSize;
    return this.http.get<User[]>(`${this.authService.usersUlr}?page=${startIndex}&per_page=${pageSize}`, {
      observe: 'response',
    })
  }

  newUser(user: NewUser): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<User>(`${this.authService.usersUlr}`, user , {headers});
  }

  removeUser(id : number){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`${this.authService.usersUlr}/${id}` , {headers});
  }

  getProfileUser(id : number | string){
    return this.getUser().pipe(
      map((users: User[]) => users.find(user => user.id === +id)!)
    );
  }

  // getData(page: number, pageSize: number) : Observable<HttpResponse<User[]>>{
  //   return this.http.get<User[]>(`${this.authService.usersUlr}?page=${page}&per_page=${pageSize}` , {
  //     observe : 'response'
  //   });
  // }

}
