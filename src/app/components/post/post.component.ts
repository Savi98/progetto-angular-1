import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from 'src/app/models/post/post.model';
import { Comment } from 'src/app/models/comment/comment.model';
import { PostsService } from 'src/app/services/post/posts.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommentService } from 'src/app/services/comment/comment.service';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PostComponent {

  allPosts!: Post[] | null;

  length !: string | null;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions : number [] = [10,25,50];

  displayedColumns: string[] = ['title'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Post | null;
  dataSource!: MatTableDataSource<Post>;

  constructor(private router: Router, public authService : AuthService , public _MatPaginatorIntl: MatPaginatorIntl,
              public dialog: MatDialog, public postService : PostsService, private commentService : CommentService,
            ){}

  ngOnInit() {
    this.loadPosts(this.pageIndex, this.pageSize);
    this._MatPaginatorIntl.itemsPerPageLabel = 'Posts per page';
  }

  backHome(){
    this.router.navigate(['/home']);
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddPostComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadPosts(pageIndex: number, pageSize: number){
    this.postService.getAllPosts(pageIndex, pageSize)
      .subscribe(result => {
        this.allPosts = result.body;
        this.allPosts?.forEach(post => {
          this.commentService.getCommentUsers(post.id)
          .subscribe((comments : Comment[]) => {
            post.comments = comments;
          })
        })
        this.length = result.headers.get('x-pagination-total');
        this.dataSource = new MatTableDataSource(this.allPosts!);
      });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPosts(this.pageIndex, this.pageSize);
  }

}
