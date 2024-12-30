import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, OnDestroy {

  user!: Usuario;
  subscription!: Subscription;

  constructor(private auth: AuthService, private router: Router, private store: Store<AppState>) { }



ngOnInit(): void {

  this.subscription = this.store.select('user').subscribe (( {user} ) => {
    if (user) {
      this.user = user;
    }
  });


}

ngOnDestroy(): void {
  this.subscription .unsubscribe();
}

logout() {
  this.auth.logout().then(() => {
    console.log('Cerró sesión');
    this.router.navigate(['/login']);
  }).catch((error) => {
    console.log(error);
  });
}
}
