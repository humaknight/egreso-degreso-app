import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; 

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBz7_TqqwenTzYslVUwGkYZzwv2jYpkWVQ",
  authDomain: "ingreso-egreso-app-9003b.firebaseapp.com",
  projectId: "ingreso-egreso-app-9003b",
  storageBucket: "ingreso-egreso-app-9003b.firebasestorage.app",
  messagingSenderId: "14000633282",
  appId: "1:14000633282:web:d22896140d64f89500125b",
  measurementId: "G-JT19SZ4VDB"
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"ingreso-egreso-app-9003b","appId":"1:14000633282:web:65af93024afcd6a900125b","storageBucket":"ingreso-egreso-app-9003b.firebasestorage.app","apiKey":"AIzaSyBz7_TqqwenTzYslVUwGkYZzwv2jYpkWVQ","authDomain":"ingreso-egreso-app-9003b.firebaseapp.com","messagingSenderId":"14000633282","measurementId":"G-6BRL42E07J"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
