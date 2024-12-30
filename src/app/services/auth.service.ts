import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;
  private _user: Usuario | undefined;

  constructor(public auth: AngularFireAuth, private firestore:AngularFirestore, private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      if(fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe((firestoreUser: any) => {

          const tempUser = Usuario.fromFirebase(firestoreUser);
          this.store.dispatch(authActions.setUser({ user: tempUser }));
          
          this._user = tempUser;
        });

      }
      else {
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this._user = undefined;
        this.store.dispatch(unSetItems());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
      const newUser = new Usuario(user?.uid || '', nombre, user?.email || '');
      this.firestore.doc(`${user?.uid}/usuario`).set({ ...newUser });
    });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this._user = undefined;
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map(fbUser => fbUser != null));
  }
  get user() {
    return { ...this._user };
  }
}
