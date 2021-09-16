import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.prod';
//import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-ui.module';
import { AppModuleAdmin } from './modules/admin/app.module';
import { AppModuleAuth } from './modules/authen/app.module';
import { AppModuleCommun } from './modules/commun/app.module';
import { AppModuleCourses } from './modules/courses/app.module';
import { AppModuleMenu } from './modules/menu/app.module';
import { AppModuleOrder } from './modules/orders/app.module';
import { AppModuleUsers } from './modules/users/app.module';
import { AppModuleShoppingCart } from './modules/shoppingCart/app.module';
import { AppModulePayment } from './modules/payment/app.module';
import { FooterComponent } from './modules/footer/footer.component';
import {
  AngularFireStorageModule,
  BUCKET 
} from "@angular/fire/compat/storage";

import firebase from 'firebase/compat/app';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppModuleAdmin,
    AppModuleAuth,
    AppModuleCommun,
    AppModuleCourses,
    AppModuleMenu,
    AppModuleOrder,
    AppModuleUsers,
    AppModuleShoppingCart,
    AppModulePayment,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
  ],
  providers: [
    { provide: BUCKET, useValue: "ebooks-d2841.appspot.com" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
