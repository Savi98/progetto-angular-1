import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/models/user/user.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  users!: Observable<User>;
  pageIndex ! : number;
  pageSize ! : number;

  constructor(private route: ActivatedRoute, private userService : UsersService, private router: Router){
    const navigation = this.router.getCurrentNavigation();
    const state = navigation!.extras.state as {pageIndex: number, pageSize : number};
    this.pageIndex = state.pageIndex;
    this.pageSize = state.pageSize;
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.users = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.userService.getProfileUser(params.get('id')!,this.pageIndex, this.pageSize)));
  }

}
