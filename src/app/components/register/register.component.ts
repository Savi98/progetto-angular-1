import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;


  constructor(private router:Router, private authService : AuthService, private http:HttpClient){}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl('',[Validators.email]),
      token: new FormControl('',[Validators.minLength(64)]),
      gender: new FormControl()
    });
  }

  onSubmit(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.registerForm.value.token}`
    });

    this.http.post<User>
    (`${this.authService.usersUlr}`,
      {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        gender: this.registerForm.value.gender,
        status: 'active'
      },{headers}
    ).subscribe({
      next : (res) => {
          this.router.navigate(['/login']);
            },
      error : (err) => {
                 if(err.status == 401){
                  window.alert("Token is not valid!");
                  this.registerForm.reset();
                 } else if (err.status == 422) {
                  window.alert("Existing user!");
                  this.router.navigate(['/login']);
                 }
               }
    });

  }

}
