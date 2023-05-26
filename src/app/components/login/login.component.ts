import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  public loginValid = true;

  constructor(private router:Router, private authService : AuthService, private http:HttpClient){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.email]),
      token: new FormControl('',[Validators.minLength(64)]),
    });
  }

  public onSubmit(): void {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.loginForm.value.token}`
    });

    const email = this.loginForm.value.email;
    const token = this.loginForm.value.token;
    this.http.get<User[]>(`${this.authService.usersUlr}`,{headers})
    .subscribe({
      next : (res)=> {
      const user = res.find((a:any)=>{
        return a.email === email;
      });
        if(user){
          alert('Login Succesful');
          this.authService.login(token);
          this.loginForm.reset();
          this.loginValid = true;
          this.router.navigate(["home"])
        }
    },
      error : (err) => {
          if(err.status == 401){
          alert("Token is not valid!");
          this.loginForm.reset();
          }
        }
    });
  }

}
