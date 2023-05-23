import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router:Router){}

  public loginValid = true;
  public username = '';
  public token = '';

  public onSubmit(): void {
    this.loginValid = true;
    this.router.navigate(['/home'])
  }


}
