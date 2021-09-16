// @ts-nocheck
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { CanActivate, Router } from '@angular/router';
import {map,switchMap} from 'rxjs/operators'
import { Observable, Subject } from 'rxjs';
import { UserService } from '../../users/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate  {
  

  constructor(private login:AngularFireAuth,private router:Router,private serviceUser:UserService) {

    this.login.authState
                        .subscribe(user=>{
                          this.serviceUser.saveUser(user);
                                        },
                                        error=>{
                                           console.log(error)
                                        }
                                        );
   }

   

   initAuthListener() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.serviceUser.saveUser(user);
        this.router.navigate(['/']);
      } else {
        // User is signed out
        this.router.navigate(['/login']);
      }
    });
  }

  loginWithGoogle()
  {
    //return this.login.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    return firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  getCurrentUser()
  {
    return  this.login.authState;
  }

  canActivate():Observable<boolean>
  {
    return this.login.authState
                     .pipe(
                       map(user=>{
                              if(user) return true
                              else
                              {
                                this.router.navigate(['/login']);
                              return false;
                              }
                       })
                     )
  }

   getCurrentUserDb()
   {
     return this.login.authState
                      .pipe(
                       switchMap(user=>{
                         try
                         {
                          return   this.serviceUser.getUserByuid(user.uid)
                         }
                         catch(error)
                         {
                           console.log(error);
                           
                         }
                       }),
                       map(user=>{
                         return user;
                       })
                      )
   }

}
