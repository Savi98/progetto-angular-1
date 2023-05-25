import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private router:Router, private authService : AuthService){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.email]),
      token: new FormControl('',[Validators.minLength(64)]),
    });
  }

  public loginValid = true;


  public onSubmit(): void {
    this.loginValid = true;
    const token = this.loginForm.value.token;
    this.authService.login(token);
    console.log(localStorage.getItem('token'));
    this.router.navigate(['/home']);
  }


}
