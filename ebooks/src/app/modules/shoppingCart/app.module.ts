import { NgModule } from '@angular/core';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { MaterialModule } from 'src/app/material-ui.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ShoppingCartComponent],
    imports: [
  MaterialModule,
  CommonModule,

      
    ],
    exports:[],
    providers: [],
    bootstrap: []
  })
  export class AppModuleShoppingCart{ }