import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public router:Router, public authService : AuthService){}

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
