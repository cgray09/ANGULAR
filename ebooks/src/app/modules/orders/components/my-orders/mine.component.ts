// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/modules/shoppingCart/services/shopping-cart.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/authen/services/login.service';
import { PaymentService } from 'src/app/modules/payment/services/payment.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MyOrdersComponent implements OnInit {
  coursesOrder:any[];
  displayedColumns: string[] = ['title','urlImage','price'];
  orders;
  i = -1;

  constructor(private shoppingCart:ShoppingCartService, private router:Router, 
    private loginService:LoginService,private paymentService:PaymentService, private orderService:OrderService) {
 
   }

  ngOnInit() {
    this.orderService.getOrdersIdByEmail()
    .subscribe(courses=>{
      this.coursesOrder = courses.filter(course=>course.email==localStorage.getItem('email'));
      // this.orders = this.coursesOrder.filter(order => order.items);
      // console.log("this.Order: ", this.orders);
      //console.log("courses: ", courses.filter(course=>course.email==localStorage.getItem('email')));
      // console.log("this.coursesOrder: ", courses);
      // console.log("this.coursesOrder: ", courses[0].email);
    });
    
    
  }

  getItems() {
    console.log("this.coursesOrder: ", this.coursesOrder);
    this.orders = this.coursesOrder.map(order => order.items);
  }

}
