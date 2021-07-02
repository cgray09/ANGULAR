import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InvoiceListingComponent } from '../invoices/components/invoice-listing/invoice-listing.component';
import { ClientListingComponent } from '../clients/components/client-listing/client-listing.component';
import { InvoiceFormComponent } from '../invoices/components/invoice-form/invoice-form.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { EditInvoiceResolverService } from '../invoices/services/edit-invoice-resolver.service';
import { InvoiceViewComponent } from '../invoices/components/invoice-view/invoice-view.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'invoices',
        // allows our invoices link in side-nav to go to this component
        component: InvoiceListingComponent, // had to import InvoicesModule in 
                                            // dashboard.module to be able to 
                                            // use it
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'invoices/new',
        component: InvoiceFormComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'invoices/:id/view',
        component: InvoiceViewComponent,
        canActivateChild: [AuthGuardService],
        resolve: {
          invoice: EditInvoiceResolverService
        }
      },
      {
        path: 'invoices/:id',
        component: InvoiceFormComponent,
        canActivateChild: [AuthGuardService],
        resolve: {
          invoice: EditInvoiceResolverService
        }
      },
      {
        path: 'clients',
        component: ClientListingComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        // this will make this route the default route so if you go
        // to localhost:4200 it will go here
        path: '**',
        redirectTo: 'invoices',
        canActivateChild: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
