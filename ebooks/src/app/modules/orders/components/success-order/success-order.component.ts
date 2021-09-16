// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.css']
})
export class SuccessOrderComponent implements OnInit {
  idOrder;
  constructor(private router:ActivatedRoute) { }

  ngOnInit() {
    this.idOrder=this.router.snapshot.params['id'];
  }

}
