import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, NewComment } from '../../models/comment/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commentUser = 'https://gorest.co.in/public/v2/posts/';

  constructor(private http:HttpClient) { }

  getCommentUser(id : number) : Observable<HttpResponse<Comment[]>> {
    return this.http.get<Comment[]>(`${this.commentUser}/${id}/comments` , {
      observe : 'response'
    });
  }

  newComment(comment: NewComment, postId : number): Observable<NewComment> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<NewComment>(`${this.commentUser}/${postId}/comments`, comment , {headers});
  }

}
