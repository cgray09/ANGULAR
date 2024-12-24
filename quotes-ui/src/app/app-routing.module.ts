import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard'; // Import the AuthGuard

const routes: Routes = [
  { path: '', redirectTo: 'quotes', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'quotes',
    loadChildren: () =>
      import('./quotes/quotes.module').then(m => m.QuotesModule)
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./edit-quote/edit-quote.module').then(m => m.EditQuoteModule),
    // canActivate: [AuthGuard] // Protect this route
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./edit-quote/edit-quote.module').then(m => m.EditQuoteModule),
    // canActivate: [AuthGuard] // Protect this route
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
