import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresosEgresosSubs!: Subscription;

  constructor(private store: Store<AppStateWithIngreso>, private ingresoEgresoService: IngresoEgresoService) {

  }

  ngOnInit(): void {
    this.ingresosEgresosSubs = this.store.select('ingresosEgresos').subscribe(({ items }) => {
      this.ingresosEgresos = items;
    });

  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubs.unsubscribe();
  }

  borrar(uid: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(() => {
        Swal.fire('Borrado', 'Item borrado', 'success');
      })
      .catch(err => {
        Swal.fire('Error', err.message, 'error');
      });
  }
}
