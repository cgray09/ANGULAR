import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {ReservationsComponent} from './reservations/reservations.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { CreateCarComponent } from './create-car/create-car.component';
import {DialogOverviewExampleDialog, MainPageComponent} from './main-page/main-page.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import {UserService} from './user.service';
import {HttpClientModule} from '@angular/common/http';
import {AdminService} from './admin.service';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
      LoginComponent,
      ReservationsComponent,
      RegisterComponent,
      NavbarComponent,
      FooterComponent,
      ManageReservationsComponent,
      CreateCarComponent,
      MainPageComponent,
      DatepickerComponent,
      AdminUsersComponent,
      DialogOverviewExampleDialog
  ], entryComponents: [DialogOverviewExampleDialog],
  imports: [
      MatSnackBarModule,
      MatProgressSpinnerModule,
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
          {path: 'users', component: AdminUsersComponent},
          {path: 'reservations', component: ReservationsComponent}
      ])
  ],
  providers: [UserService, LoginComponent, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
