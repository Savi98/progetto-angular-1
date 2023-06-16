import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/models/user/user.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  constructor(private router:Router, private userService : UsersService, public dialogRef: MatDialogRef<AddUserComponent>){}

  newUserForm!: FormGroup;

  ngOnInit(): void {
    this.newUserForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl('',[Validators.email]),
      gender: new FormControl()
    });
  }

  onAddUser(){
    const user : NewUser =
      {
        name: this.newUserForm.value.name,
        email: this.newUserForm.value.email,
        gender: this.newUserForm.value.gender,
        status: 'active',
      };
    this.userService.newUser(user).subscribe({
      next : (res) => {
        window.alert("User added!");
        this.dialogRef.close([]);
      },
      error : (err) => {
        if (err.status == 422) {
        window.alert("Existing user!");
        }
      }
    });
  }

}
