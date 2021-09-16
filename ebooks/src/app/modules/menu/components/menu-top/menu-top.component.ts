import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modules/authen/services/login.service';
import { AuthService } from 'src/app/modules/authen/services/auth.service';
import { switchMap,map,mergeMap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/modules/shoppingCart/services/shopping-cart.service';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Subscription } from "rxjs";
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {
  user:any;
  nbrShoppingCourse:number=0;
  userIsAuthenticated: any = false;
  private authListenerSubs: Subscription;

  constructor(public nav: NavbarService, private authService: AuthService, private login:LoginService,private shoppingCart:ShoppingCartService, private router:Router) { }

  ngOnInit() {
    this.login.getCurrentUser()
              .pipe(
                switchMap(user=>{
                  if(!user) return 'e';
                    return  this.login.getCurrentUserDb();
                }),
                mergeMap(userDb=>this.shoppingCart.getListItemsShoppingCart().pipe(
                   
                  map(coursesShopping=>{
                    return [userDb,coursesShopping]
                  })
                ))
              )
              .subscribe(([userDb,coursesShopping])=>{
                this.nbrShoppingCourse=(coursesShopping as any[]).length;
                if(userDb!='e')
                { 
                this.user=userDb
                }
                else
                {
                this.user=null;
                }
                
              },erreur=> console.log)

  this.userIsAuthenticated = this.authService.getIsAuth();
  this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.user = localStorage.getItem("email");
    });
    this.user = localStorage.getItem("email");
}

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  logout()
  {
    this.authService.logout();
  }

  // logout()
  // {
  //   this.login.logoutWithGoogle();
  // }

  recapShopping()
  {
    if (this.nbrShoppingCourse<=0) return ;
    this.router.navigate(['/shooping-cart']);
  }

}

