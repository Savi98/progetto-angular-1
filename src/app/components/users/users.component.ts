import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  users: User[] = [];

  allUsers! : User[] | null;

  myControl = new FormControl<string | User>('');

  filteredOptions!: Observable<User[]>;

  columnNum = 1;

  length! : string | null | number;

  pageIndex: number = 1;

  pageSize: number = 10;

  pageSizeOptions = [10,25,50];

  pageEvent!: PageEvent;

  constructor(private router:Router, private userService : UsersService, public _MatPaginatorIntl: MatPaginatorIntl,
              public dialog: MatDialog){}

  ngOnInit() {
    this.userService.getUser().subscribe((res : User []) => {
      this.users = res;
    });

    this.getUsers(this.pageIndex, this.pageSize);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.users.slice();
      }),
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.users.filter(user => user.name.toLowerCase().includes(filterValue));
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddUserComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  onSearch() {

  }

  getUsers(pageIndex : number, pageSize : number) {
    this.userService.getUsers(pageIndex, pageSize).subscribe({
      next : (res) => {
        this.length = res.headers.get('x-pagination-total');
        this.allUsers = res.body;
      },
      error : (err) => {

      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  updateUser(e : any) {
    this.users = this.users?.filter((user) => user.id !== e);
  }

  onRemove(){

  }

}
