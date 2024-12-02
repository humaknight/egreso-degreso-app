import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registroForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  crearUsuario() {
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
