import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { HomeComponent } from './modules/commun/components/home/home.component';
import { CoursesComponent } from './modules/courses/components/courses/courses.component';
import { LoginComponent } from './modules/authen/components/login/login.component';
import { SignupComponent } from './modules/authen/components/signup/signup.component';
import { AboutComponent } from './modules/commun/components/about/about.component';
//import { combineAll } from 'rxjs/operators';
import { OrdersComponent } from './modules/orders/components/orders/orders.component';
import { MyOrdersComponent } from './modules/orders/components/my-orders/mine.component';
import { AdminCoursesComponent } from './modules/admin/components/admin-courses/admin-courses.component';
//import { LoginService } from './modules/authen/services/login.service';
//import { AdminService } from './modules/admin/services/admin.service';
import { ShoppingCartComponent } from './modules/shoppingCart/components/shopping-cart/shopping-cart.component';
import { SuccessOrderComponent } from './modules/orders/components/success-order/success-order.component';
import { CourseContentComponent } from './modules/courses/components/course-content/course-content.component';


const routes: Routes = [
 
  {
    path:'',
    component:CoursesComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'orders',
    component:OrdersComponent,
   // canActivate:[LoginService]
  },
  {
    path:'admin-courses',
    component:AdminCoursesComponent,
    //canActivate:[LoginService,AdminService]
  },
  {
    path:'shooping-cart',
    component:ShoppingCartComponent
  },
  {
    path:'success-orde/:id',
    component:SuccessOrderComponent,
  //  canActivate:[LoginService]
  },
   {
     path:'course-content/:id',
     component:CourseContentComponent,
   //  canActivate:[LoginService]
   },
   {
     path:'my-orders',
     component:MyOrdersComponent,
   //  canActivate:[LoginService]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
