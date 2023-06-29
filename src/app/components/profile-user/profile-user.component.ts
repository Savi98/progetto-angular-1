import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CommentComponent } from 'src/app/comment/comment.component';
import { Post } from 'src/app/models/post/post.model';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostsService } from 'src/app/services/post/posts.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProfileUserComponent implements OnInit {

  posts!: Post[] | null;
  users!: Observable<User>;
  pageIndex ! : number;
  pageSize ! : number;

  displayedColumns: string[] = ['title'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: User | null;
  dataSource!: MatTableDataSource<Post>;

  constructor(private route: ActivatedRoute,
              private userService : UsersService, 
              private router: Router, 
              public authService : AuthService,
              public postService : PostsService,
              public dialog: MatDialog
    ){
    const navigation = this.router.getCurrentNavigation();
    const state = navigation!.extras.state as {pageIndex: number, pageSize : number};
    this.pageIndex = state.pageIndex;
    this.pageSize = state.pageSize;
  }

  ngOnInit(): void {
    this.getUser();

    this.route.params.subscribe(params => {
      let idValue = params['id'];
      this.loadPosts(idValue);
    });
  }

  getUser(){
    this.users = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.userService.getProfileUser(params.get('id')!,this.pageIndex, this.pageSize)));
  }

  loadPosts(id : number){
    this.postService.getPostsUser(id)
      .subscribe(result => {
        this.posts = result.body;
        this.dataSource = new MatTableDataSource(this.posts!);
      });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CommentComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}