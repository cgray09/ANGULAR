import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {
    MatButtonModule,
    MatCardModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule, MatPaginatorModule, MatSidenavModule, MatTableModule,
    MatToolbarModule,
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { CreateCarComponent } from './create-car/create-car.component';
import {DialogOverviewExampleDialog, MainPageComponent} from './main-page/main-page.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import {UserService} from './user.service';
import {HttpClientModule} from '@angular/common/http';
import {AdminService} from './admin.service';
import {BsDatepickerModule} from 'ngx-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
      LoginComponent,
      RegisterComponent,
      NavbarComponent,
      ManageReservationsComponent,
      CreateCarComponent,
      MainPageComponent,
      DatepickerComponent,
      AdminUsersComponent,
      DialogOverviewExampleDialog
  ], entryComponents: [DialogOverviewExampleDialog], // since we use it in "main-page"
  imports: [
      MatSnackBarModule,
      HttpClientModule,
      MatDialogModule,
      BsDatepickerModule.forRoot(),
      BrowserModule,
      MatTableModule,
      MatPaginatorModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      FormsModule,
      MatInputModule,
      BrowserAnimationsModule,
      MatCardModule,
      MatToolbarModule,
      RouterModule.forRoot([
          {path: '', component: LoginComponent},
          {path: 'register', component: RegisterComponent},
          {path: 'main', component: MainPageComponent},
          {path: 'create-car', component: CreateCarComponent},
          {path: 'manage', component: ManageReservationsComponent},
          {path: 'users', component: AdminUsersComponent}
      ])
  ],
  providers: [UserService, LoginComponent, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
