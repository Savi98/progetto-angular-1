import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/models/user/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  users!: Observable<User>;

  constructor(private route: ActivatedRoute, private userService : UsersService){}

  ngOnInit(): void {
    this.users = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.userService.getProfileUser(params.get('id')!)));
  }

}
