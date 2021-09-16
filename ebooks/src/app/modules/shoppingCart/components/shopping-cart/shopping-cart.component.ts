// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  coursesShopping:any[];
  displayedColumns: string[] = ['title', 'description','urlImage','price','actions'];

  constructor(private shoppingCart:ShoppingCartService, private router:Router) { }

  ngOnInit() {
    this.shoppingCart.getListItemsShoppingCartMapCourses()
                    .subscribe(courses=>this.coursesShopping=courses);
  }
  getTotal()
  {
    let total:number=0;
    if(!this.coursesShopping) return total;
    this.coursesShopping.forEach(course=>{
      total=total + course.price
    })
    return total;
  }
  Delete(row)
  {
    this.shoppingCart.deleteCourseShoppingCart(row.key);
  }
  OnNext()
  {
    this.router.navigate(['/orders']);
  }

}
