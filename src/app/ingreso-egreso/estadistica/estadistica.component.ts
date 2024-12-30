import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html'
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos:number = 0;
  egresos:number = 0;

  totalEgresos:number = 0;
  totalIngresos:number = 0;

  constructor(private store:Store<AppState>) { 

  }

  ngOnInit(): void {
    this.store.select('ingresosEgresos').subscribe( ({items}) => {
      this.generarEstadistica(items);
    });
  }

  ngOnDestroy(): void {
      
  }

  generarEstadistica(items: IngresoEgreso[]){
    this.ingresos = 0;
    this.egresos = 0;
    this.totalEgresos = 0;
    this.totalIngresos = 0;

    items.forEach(item => {
      if(item.tipo === 'ingreso'){
        this.totalIngresos += item.monto;
        this.ingresos++;
      }else{
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    });

  }
}
