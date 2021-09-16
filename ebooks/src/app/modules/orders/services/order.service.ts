// @ts-nocheck
import { Injectable } from '@angular/core';
import{AngularFireDatabase} from '@angular/fire/compat/database';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders;
  constructor(private db:AngularFireDatabase ) { }

  createOrder(order)
  {
   return this.db.list('/orders').push(order);
  }

  getOrdersIdByEmail()
  {
    return this.db.list('/orders')
                 .snapshotChanges()
                 .pipe(
                  map(changes =>
                    changes.map(c => (
                      { 
                        key: c.payload.key, ...c.payload.val() 
                      }
                      ))
                 )
                 )

      

                          
    // return this.db.list('/orders', ref=>ref.orderByChild('email').equalTo(localStorage.getItem('email')))
    //                               .snapshotChanges()
    //                               .pipe(
    //                                 map(idOrders=>{
    //                                 return  idOrders.map(ids=>{
    //                                            return ids.key
    //                                   })
    //                                 })
    //                               )
  }

  getCoursesByIdOrder(idOrder)
  {
    return this.db.object('/orders/'+idOrder+'/items/')
                 .snapshotChanges()
                 .pipe(
                   map(courses=>{
                     return courses.payload.val();
                   })
                 )
  }
}
