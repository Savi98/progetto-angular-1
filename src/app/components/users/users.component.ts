import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, merge, of} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit{

  users: User[] = [];

  allUsers!: User[] | null;

  myControl = new FormControl<string | User>('');

  filteredOptions!: Observable<User[]>;

  columnNum = 1;

  length !: string | null;

  pageIndex = 0;

  pageSize = 10;

  pageSizeOptions : number [] = [10,25,50];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router:Router, private userService : UsersService, public _MatPaginatorIntl: MatPaginatorIntl,
              public dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef){}


  ngOnInit() {
    this.userService.getUser().subscribe((res : User []) => {
      this.users = res;
    });

    this.loadUsers(this.pageIndex, this.pageSize);

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

  loadUsers(pageIndex: number, pageSize: number) {
    this.userService.getUsers(pageIndex, pageSize)
      .subscribe(result => {
        this.allUsers = result.body;
        this.length = result.headers.get('x-pagination-total');
      });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers(this.pageIndex, this.pageSize);
  }

  onRemove(){

  }

}
