// @ts-nocheck
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscriber, Subscription, from } from 'rxjs';
import { CategorieService } from 'src/app/modules/commun/services/categorie.service';
import { CourseService } from '../../services/course.service';
import {mergeMap,map, switchMap} from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/modules/shoppingCart/services/shopping-cart.service';
import { LoginService } from 'src/app/modules/authen/services/login.service';
import { OrderService } from 'src/app/modules/orders/services/order.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit,OnDestroy {


  categories:any[];
  courses:any[];
  coursesShoppingCart:any[];
  sub:Subscription;
  coursesAccess:any[]=[];


  constructor(private snackBar: MatSnackBar, private serviceCategorie:CategorieService,private serviceCourses:CourseService, 
    private serviceShoppingCart:ShoppingCartService
    ,private loginService:LoginService,
    private orderService:OrderService,
    private router:Router) { }
  ngOnInit() {
   this.sub=this.serviceCategorie.getAllCategories()
                        .pipe(
                          mergeMap(categories=>this.serviceCourses.getAllCourses().pipe(
                            mergeMap(courses=>this.serviceShoppingCart.getListItemsShoppingCart().pipe(
                            map(coursesShopping=>[categories,courses,coursesShopping])))
                          ))).subscribe(([categories,courses,coursesShopping])=>{
                            this.categories=categories;
                            this.courses=courses;
                            this.coursesShoppingCart=coursesShopping;
                            console.log('courseShopping : '+coursesShopping);
                          });
    this.loginService.getCurrentUserDb()
                     .pipe(
                       switchMap(userDb=>{
                        return this.orderService.getOrderIdByUserId(userDb.id).pipe(
                          switchMap(items=>{
                            let coursesArray:any[]=[];
                            items.forEach(idOrder=>{
                                      this.orderService.getCoursesByIdOrder(idOrder)
                                                        .pipe(
                                                          map(coursesOrders=>{
                                                            return coursesOrders
                                                          })
                                                        ).subscribe((coursesOrders:any[])=>{
                                                          coursesOrders.forEach(course=>{
                                                            coursesArray.push(course);
                                                          })
                                                        })
                            })
                            this.coursesAccess=coursesArray;
                            console.log('coursesArray :',coursesArray);
                            return coursesArray;
                          })

                         )
                       })
                     ).subscribe(coursesOrder=>{

                     })
                                                            
  }
  getCoursesByCategorie(key)
  {
      return this.courses.filter(course=>course.categorie==key);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  AddToCart(course)
  {
    console.log(course);
   this.serviceShoppingCart.AddToCart(course);
   this.snackBar.open('EBook added to cart','Success',{duration:10000});
  }
  existCourseInShoppingCart(key):boolean
  {
   return this.coursesShoppingCart.find((course:any)=>course.key==key) 
  }

  DeleteToCart(course)
  {
    this.serviceShoppingCart.deleteCourseShoppingCart(course.key);
    this.snackBar.open('EBook removed from cart','Success',{duration:10000});
  }

  ExistCoursesById(key):boolean
  {
    return this.coursesAccess.find((course:any)=>course.key==key) 
  }
  AccessCourse(key)
  {
    this.router.navigate(['/course-content',key])

  }
  

}
