import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { user } from '@angular/fire/auth';
import * as ingresosEgresos from '../ingreso-egreso/ingreso-egreso.actions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy{

  uSerSubs!:Subscription;
  ingresosEgresosSubs!:Subscription;

  constructor(private store:Store<AppState>, private ingresoEgresoService:IngresoEgresoService){

  }

  ngOnDestroy(): void {
    this.uSerSubs.unsubscribe();
    this.ingresosEgresosSubs.unsubscribe();
  }

  ngOnInit() {
    this.uSerSubs = this.store.select('user')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe( ({user}) => {
      console.log(user);
      this.ingresosEgresosSubs = this.ingresoEgresoService.initIngresosEgresosListener(user?.uid || '').subscribe( ingresosEgresosFB => {
        console.log(ingresosEgresosFB);
        this.store.dispatch(ingresosEgresos.setItems({items: ingresosEgresosFB}));
      });
    });

    
  }

}
