import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(private auth:AuthService, private router:Router) { }
  logout() {
    this.auth.logout().then(() => {
      console.log('Cerró sesión');
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log(error);
    });
  }
}
