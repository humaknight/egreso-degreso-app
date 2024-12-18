import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor(private fb: FormBuilder, private auth:AuthService, private router:Router, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {
    this.store.dispatch(ui.isLoading());
    if (this.registroForm.invalid) {
      return;
    }

    Swal.fire({
      title: "Espere por favor",

      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.auth.crearUsuario(this.registroForm.value.nombre, this.registroForm.value.correo, this.registroForm.value.password).then(resp => {
      console.log(resp);

      Swal.close();
      this.router.navigate(['/']);
      this.store.dispatch(ui.stopLoading());
    }).catch(err => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message
      });
      this.store.dispatch(ui.stopLoading());
    });
  }
}
