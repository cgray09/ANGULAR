import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NoAuthGuardService } from './core/services/no-auth-guard.service';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'signup',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule)
    //loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  }, {
    path: '**',
    redirectTo: 'dashboard'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
