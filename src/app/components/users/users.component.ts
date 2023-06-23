import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import {Component, OnInit} from '@angular/core';
import {MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import {MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UsersComponent implements OnInit{

  users: User[] = [];
  allUsers!: User[] | null;

  length !: string | null;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions : number [] = [10,25,50];

  displayedColumns: string[] = ['name'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: User | null;
  dataSource!: MatTableDataSource<User>;

  constructor(private router:Router, private userService : UsersService, public _MatPaginatorIntl: MatPaginatorIntl,
              public dialog: MatDialog){}

  ngOnInit() {
    this.loadUsers(this.pageIndex, this.pageSize);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddUserComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  loadUsers(pageIndex: number, pageSize: number){
    this.userService.getUsers(pageIndex, pageSize)
      .subscribe(result => {
        this.allUsers = result.body;
        this.length = result.headers.get('x-pagination-total');
        this.dataSource = new MatTableDataSource(this.allUsers!);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers(this.pageIndex, this.pageSize);
  }

  onRemoveUser(id : number) {
    this.userService.removeUser(id).subscribe({
      next : (res) => {
        window.alert("User deleted!");
        this.loadUsers(this.pageIndex, this.pageSize);
      },
      error : (err) => {
      }
    });
  }
}
