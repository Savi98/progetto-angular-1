import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private router: Router, public authService : AuthService){}

  backHome(){
    this.router.navigate(['/home']);
  }

  posts(){
    this.router.navigate(['/posts']);
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
