import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm !: FormGroup;

  constructor(private fb: FormBuilder, private auth:AuthService, private router:Router) { 
    this.loginForm = this.fb.group({
      correo: ['correo', [Validators.required, Validators.email]],
      password: ['password', Validators.required]
    });
  }
  loginUsuario() {
    if (this.loginForm.invalid) {
      return;
    }
    Swal.fire({
      title: "Espere por favor",

      didOpen: () => {
        Swal.showLoading();
      }
    });
    console.log(this.loginForm.value);
    this.auth.loginUsuario(this.loginForm.value.correo, this.loginForm.value.password).then(resp => {
      console.log(resp);
      Swal.close();
      this.router.navigate(['/']);
    }).catch(err => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message
      });
    });
  }
}
