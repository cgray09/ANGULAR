// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/modules/shoppingCart/services/shopping-cart.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/authen/services/login.service';
import { PaymentService } from 'src/app/modules/payment/services/payment.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  coursesOrder:any[];
  displayedColumns: string[] = ['title','urlImage','price'];
  user;
  order;

  constructor(private shoppingCart:ShoppingCartService, private router:Router, 
    private loginService:LoginService,private paymentService:PaymentService, private orderService:OrderService) {
 
   }

  ngOnInit() {
    this.shoppingCart.getListItemsShoppingCartMapCourses()
    .subscribe(courses=>this.coursesOrder=courses);
    this.loginService.getCurrentUserDb()
                     .subscribe(user=>this.user=user);
  }

  getTotal()
  {
    let total:number=0;
    if(!this.coursesOrder) return total;
    this.coursesOrder.forEach(course=>{
      total=total + course.price
    })
    return total;
  }

  OnCancel()
  {
    this.router.navigate(['/courses']);

  }
  async OnPay()
  {
    //Create the order
    if (localStorage.getItem('email')) {
      this.order = {
        dateCreated:new Date().getTime(),
        email: localStorage.getItem('email'),
        items:this.coursesOrder,
        total:this.getTotal(),
        paid:true
      }
    } else {
      this.order = {
        dateCreated:new Date().getTime(),
        items:this.coursesOrder,
        total:this.getTotal(),
        paid:true
      }
    }
    
   let orderResult:any= await this.orderService.createOrder(this.order);
    this.shoppingCart.clearShpoppingCart();
    this.router.navigate(['/success-orde',orderResult.key]);
   //Clear the shopping Cart

   //let resultPayment =this.paymentService.payment(orderResult.key,this.getTotal());
   //if(resultPayment)
   //{
     //Update the order with paid=true
   //}
  // else
  // {
     //Update the order with paid=false 
  // }


  }
}
