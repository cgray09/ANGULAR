// @ts-nocheck
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { AngularFireAuth } from 'angularfire2/auth';
// import {AngularFireAuth} from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import {AngularFireAuth} from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {

    

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      this.store.dispatch(new Auth.SetAuthenticated());
      this.router.navigate(['/training']);
    } else {
      // User is signed out
      // ...
      this.trainingService.cancelSubscriptions();
      this.store.dispatch(new Auth.SetUnauthenticated());
      this.router.navigate(['/login']);
    }
  });

    //this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.store.dispatch(new Auth.SetAuthenticated());
    //     this.router.navigate(['/training']);
    //   } else {
    //     this.trainingService.cancelSubscriptions();
    //     this.store.dispatch(new Auth.SetUnauthenticated());
    //     this.router.navigate(['/login']);
    //   }
    // });
  }

  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    //this.afAuth.auth
    firebase.auth()
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    //this.afAuth.auth
    firebase.auth()
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout() {
    //this.afAuth.auth.signOut();
    firebase.auth().signOut();
  }
}
