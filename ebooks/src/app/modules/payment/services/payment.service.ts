import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }
  payment(idOrder:string,amount:number):boolean
  {
    //call back to function in fire base to call provider service for the payement
    //receive if its ok or no for payement
    return true;

  }
}
