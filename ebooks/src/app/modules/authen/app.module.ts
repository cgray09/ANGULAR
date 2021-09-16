import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MaterialModule } from 'src/app/material-ui.module';
import { FormsModule }   from '@angular/forms';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [LoginComponent, SignupComponent],
    imports: [
      MaterialModule,
      FormsModule,
      CommonModule,
      MatSnackBarModule,
      RouterModule 
    ],
    providers: [AuthService],
    bootstrap: []
  })
  export class AppModuleAuth { }