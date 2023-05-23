import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router:Router){}

  public loginValid = true;
  public username = '';
  public token = '';

  public onSubmit(): void {
    this.loginValid = true;
    this.router.navigate(['/home'])
  }

}
