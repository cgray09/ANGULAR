import { NgModule } from '@angular/core';
import { OrdersComponent } from './components/orders/orders.component';
import { MyOrdersComponent } from './components/my-orders/mine.component';

import { MaterialModule } from 'src/app/material-ui.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SuccessOrderComponent } from './components/success-order/success-order.component';

@NgModule({
    declarations: [
      OrdersComponent, 
      SuccessOrderComponent,
      MyOrdersComponent
    ],
    imports: [
  MaterialModule,
  CommonModule,
  FlexLayoutModule
  
      
    ],
    exports:[OrdersComponent],
    providers: [],
    bootstrap: []
  })
  export class AppModuleOrder{ }