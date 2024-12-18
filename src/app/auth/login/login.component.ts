import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm !: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription;
  constructor(private fb: FormBuilder, private auth:AuthService, private router:Router, private store:Store<AppState>) { 
    
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['correo', [Validators.required, Validators.email]],
      password: ['password', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  loginUsuario() {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());

    /* Swal.fire({
      title: "Espere por favor",

      didOpen: () => {
        Swal.showLoading();
      }
    });
    console.log(this.loginForm.value); */

    this.auth.loginUsuario(this.loginForm.value.correo, this.loginForm.value.password).then(resp => {
      console.log(resp);
      // Swal.close();
      this.store.dispatch(ui.stopLoading());
      this.router.navigate(['/']);
    }).catch(err => {
      console.log(err);
      this.store.dispatch(ui.stopLoading());
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message
      });
    });
  }
}
