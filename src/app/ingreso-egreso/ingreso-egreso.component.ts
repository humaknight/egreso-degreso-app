import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html'
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor( private fb: FormBuilder, private ingresoEgresoService:IngresoEgresoService, private store:Store<AppState>) { }

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });

  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  guardar() {
    this.store.dispatch(ui.isLoading());

    if (this.ingresoForm.invalid) { return; }
    console.log(this.ingresoForm.value);
    console.log(this.tipo);

    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(() => {
      this.ingresoForm.reset();
      Swal.fire('Registro creado', descripcion, 'success');
      this.store.dispatch(ui.isLoading());
    }).catch(err => {
      Swal.fire('Error', err.message, 'error');
      this.store.dispatch(ui.isLoading());
    });
  }
}
