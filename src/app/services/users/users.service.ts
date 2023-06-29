import { Injectable} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NewUser, User } from 'src/app/models/user/user.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient, private authService : AuthService ) { }

  getUsers(pageIndex: number, pageSize: number): Observable<HttpResponse<User[]>> {
    const startIndex = pageIndex * pageSize;
    return this.http.get<User[]>(`${this.authService.usersUlr}?page=${startIndex}&per_page=${pageSize}`, {
      observe: 'response',
    })
  }

  getUserProfile(pageIndex: number, pageSize: number): Observable<User[]> {
    const startIndex = pageIndex * pageSize;
      return this.http.get<User[]>(`${this.authService.usersUlr}?page=${startIndex}&per_page=${pageSize}`
    )
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

  getProfileUser(id : number | string, pageIndex: number, pageSize: number){
    return this.getUserProfile(pageIndex, pageSize).pipe(
      map((users) => users.find((user: any) => user.id === +id)!)
    )
  }

}
