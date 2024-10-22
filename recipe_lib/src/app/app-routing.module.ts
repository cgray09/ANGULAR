import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/', pathMatch: 'full' },
  { path: 'home/', component: HomeComponent },
  { path: 'results/:query', component: ResultsComponent },
  { path: 'details/:id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
