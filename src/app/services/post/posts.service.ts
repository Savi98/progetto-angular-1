import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post } from '../../models/post/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  allPostUrl = 'https://gorest.co.in/public/v2/posts';
  postUser = `https://gorest.co.in/public/v2/users/`;

  constructor(private http:HttpClient) { }

  getPostsUser(id : number) : Observable<HttpResponse<Post[]>> {
    return this.http.get<Post[]>(`${this.postUser}/${id}/posts` , {
      observe : 'response'
    });
  }
}
