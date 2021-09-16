// @ts-nocheck
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {take,map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  async AddToCart(course)
  {
    let cartId=localStorage.getItem('cartId');
    if(!cartId)
    {
     let cart= await this.db.list('/shoppingCart').push({
        dateCreated:new Date().getTime()
      });
      localStorage.setItem('cartId',cart.key)
      this.AddCourseCart(cart.key,course)
    }
    else
    {
      this.AddCourseCart(localStorage.getItem('cartId'),course);
    }
  }
  AddCourseCart(idCart,courseAdd)
  {
    console.log('addCourse',courseAdd);
    this.db.object('/shoppingCart/'+idCart+'/items/'+courseAdd.key)
             .snapshotChanges()
             .pipe(
               take(1)
             ).subscribe(
              courseCart=>{
                console.log(courseCart);
                 if(!courseCart.key)
                 {
                   this.db.list('/shoppingCart/'+idCart+'/items/').set(courseAdd.key,{course:courseAdd})
                 }
               }
             )

  }

  getListItemsShoppingCart()
  {
    let cartId=localStorage.getItem('cartId');
   return this.db.list('/shoppingCart/'+cartId+'/items/')
            .snapshotChanges()
            .pipe(

              map(courses =>
                      courses.map(c => (
                           { 
                            
                             key: c.payload.key, ...c.payload.val() 
                           }
                           ))
            ))

   
  }
  deleteCourseShoppingCart(id:string)
  {
    let cartId=localStorage.getItem('cartId');
    return this.db.object('/shoppingCart/'+cartId+'/items/'+id).remove();
  }

  getListItemsShoppingCartMapCourses()
  {
    let cartId=localStorage.getItem('cartId');
   return this.db.list('/shoppingCart/'+cartId+'/items/')
            .snapshotChanges()
            .pipe(

              map(courses =>
                      courses.map(c => (
                           { 
                            
                             key: c.payload.key, ...(c.payload.val() as any).course
                           }
                           ))
            ))

   
  }
  clearShpoppingCart()
  {
    let cartId=localStorage.getItem('cartId');
    this.db.object('/shoppingCart/'+cartId+'/items/').remove();
  }
}
