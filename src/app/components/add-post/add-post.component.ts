import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewPost } from 'src/app/models/post/post.model';
import { PostsService } from 'src/app/services/post/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  constructor(private router:Router, private postService : PostsService, public dialogRef: MatDialogRef<AddPostComponent>){}

  newPostForm!: FormGroup;

  ngOnInit(): void {
    this.newPostForm = new FormGroup({
      title: new FormControl(),
      body: new FormControl()
    });
  }

  onAddPost(){
    let userData = JSON.parse(localStorage.getItem('user')!);
    let userId = userData.user.id;
    const post : NewPost =
      {
        user_id : userId,
        title: this.newPostForm.value.title,
        body: this.newPostForm.value.body,
      };
    this.postService.newUser(post).subscribe({
      next : (res) => {
        window.alert("Post added!");
        this.dialogRef.close([]);
      },
      error : (err) => {
        console.log(err)
      }
    });
  }

}
