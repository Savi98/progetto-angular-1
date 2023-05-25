import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private router:Router){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.email]),
      token: new FormControl('',[Validators.minLength(64)]),
    });
  }

  public loginValid = true;


  public onSubmit(): void {
    this.loginValid = true;
    this.router.navigate(['/home']);

    localStorage.setItem('token',this.loginForm.value.token);
    console.log(localStorage.getItem('token'));
  }


}
