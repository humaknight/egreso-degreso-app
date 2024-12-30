import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; 

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// ngrx
import {StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

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
    AppComponent
    
    
  ],
  imports: [
    BrowserModule,
    AuthModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"ingreso-egreso-app-9003b","appId":"1:14000633282:web:65af93024afcd6a900125b","storageBucket":"ingreso-egreso-app-9003b.firebasestorage.app","apiKey":"AIzaSyBz7_TqqwenTzYslVUwGkYZzwv2jYpkWVQ","authDomain":"ingreso-egreso-app-9003b.firebaseapp.com","messagingSenderId":"14000633282","measurementId":"G-6BRL42E07J"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
