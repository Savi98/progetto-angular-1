import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NewPost, Post } from '../../models/post/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  allPostsUrl = 'https://gorest.co.in/public/v2/posts';
  postUser = `https://gorest.co.in/public/v2/users/`;

  constructor(private http:HttpClient) { }

  getAllPosts(pageIndex: number, pageSize: number): Observable<HttpResponse<Post[]>> {
    const startIndex = pageIndex * pageSize;
    return this.http.get<Post[]>(`${this.allPostsUrl}?page=${startIndex}&per_page=${pageSize}`, {
      observe: 'response',
    })
  }

  getPostsUser(id : number) : Observable<HttpResponse<Post[]>> {
    return this.http.get<Post[]>(`${this.postUser}/${id}/posts` , {
      observe : 'response'
    });
  }

  newUser(post: NewPost): Observable<NewPost> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<NewPost>(`${this.allPostsUrl}`, post , {headers});
  }
}
