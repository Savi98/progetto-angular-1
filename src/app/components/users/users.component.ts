import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  users: User[] = [];

  myControl = new FormControl<string | User>('');

  filteredOptions!: Observable<User[]>;

  columnNum = 1;

  constructor(private router:Router, private userService : UsersService, private authService : AuthService, private http:HttpClient){}

  ngOnInit() {
    this.userService.getUser().subscribe((res : User []) => {
      this.users = res;
    });

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

  onSearch() {

  }

  onViewList(){
    this.columnNum = 2;
  }

  onViewModule() {
    this.columnNum = 3;
  }

  onRemove(){

  }

}
