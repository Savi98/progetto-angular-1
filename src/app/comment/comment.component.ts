import { Component, Inject } from '@angular/core';
import { CommentService } from '../services/comment/comment.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comment, NewComment } from 'src/app/models/comment/comment.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  comments!: Comment [] | null;

  comment!: string;

  newCommentForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CommentComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
              private commentService : CommentService
  ){}

  ngOnInit(): void {
    this.loadComments(this.data);

    this.newCommentForm = new FormGroup({
      body: new FormControl()
    });
  }

  loadComments(id : number){
    this.commentService.getCommentUser(id)
    .subscribe(result => {
      this.comments = result.body;
      console.log(this.comments);
    })
  }

  addComment(postId : number){
    const comment : NewComment =
      {
        name : localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        body: this.newCommentForm.value.body,
      };
    this.commentService.newComment(comment, postId).subscribe({
      next : (res) => {
        window.alert("Comment added!");
        this.loadComments(this.data);
        this.dialogRef.close([]);
      },
      error : (err) => {
        console.log(err)
      }
    });
  }

}
