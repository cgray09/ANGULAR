import { NgModule } from '@angular/core';
import { MenuTopComponent } from './components/menu-top/menu-top.component';
import { MaterialModule } from 'src/app/material-ui.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {BrowserModule} from "@angular/platform-browser"
import { CommonModule } from '@angular/common';
import { NavbarService } from './services/navbar.service';

@NgModule({
    declarations: [MenuTopComponent],
    imports: [
      MaterialModule,
      AppRoutingModule,
      BrowserModule,
      CommonModule
    ],
    exports:[MenuTopComponent],
    providers: [NavbarService],
    bootstrap: []
  })
  export class AppModuleMenu{ }