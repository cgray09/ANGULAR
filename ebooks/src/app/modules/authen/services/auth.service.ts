// @ts-nocheck
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Subject } from "rxjs";
import { AuthData } from './auth-data.model';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private router: Router, private snackBar: MatSnackBar
  ) {}

  registerUser(authData: AuthData) {
    firebase.auth()
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.router.navigate(['/login']);
        this.snackBar.open('Sign up successful','Success',{duration:10000});
      })
      .catch(error => {
        this.snackBar.open(error.message,'Failure',{duration:10000});
      });
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(authData: AuthData) {
    firebase.auth()
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log("USER: ", result.user.email);
        localStorage.setItem('email', result.user.email);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/']);
        this.snackBar.open('Logged in successfully','Success',{duration:10000});
      })
      .catch(error => {
        console.log(error);
        this.snackBar.open(error.message,'Failure',{duration:10000});
      });
  }

  loginWithGoogle()
  {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        localStorage.setItem('email', result.user.email);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/']);
        this.snackBar.open('Logged in successfully','Success',{duration:10000});
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(error);
        this.snackBar.open(error.message,'Failure',{duration:10000});
        // ...
      });
  }


  logout() {
    firebase.auth().signOut();
    this.authStatusListener.next(false);
    localStorage.removeItem('email');
    this.snackBar.open('Logged out successfully','Success',{duration:10000});
  }

  autoAuthUser() {
    if (localStorage.getItem('email')) {
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }
}
