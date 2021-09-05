import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Client } from '../../models/client';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import 'rxjs/add/operator/mergeMap';
//import { remove } from 'lodash';
@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'email', 'action'];
  dataSource = new MatTableDataSource<Client>();
  isResultsLoading = false
  constructor(private clientService: ClientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isResultsLoading = true;
    this.clientService.getClients()
      .subscribe(data => {
        console.log(data)
        this.dataSource.data = data;
      }, err => this.errorHandler(err, 'Ops!, something went wrong'),
        () => this.isResultsLoading = false);
  }
  saveBtnHanlder() {

  }

  deleteBtnHandler(clientId: any) {
    this.clientService.deleteClient(clientId)
      .subscribe(data => {
        const removedItems = this.dataSource.data.filter(item => item._id !== data._id)
        this.dataSource.data = [...removedItems];
        this.snackBar.open('Client deleted', 'Success', {
          duration: 2000
        })
      }, err => this.errorHandler(err, 'Failed to delete client'))
  }
  openDialog(clientId: any = ""): void {
    const options = {
      width: '400px',
      height: '300px',
      data: {}
    }
    if (clientId) {
      options.data = { clientId: clientId }
    }
    let dialogRef = this.dialog.open(FormDialogComponent, options);
    dialogRef.afterClosed()
      .flatMap(result => {
        return clientId ? this.clientService.updateClient(clientId, result) : this.clientService.createClient(result)
      })
      .subscribe(client => {
        let successMsg = '';
        if (clientId) {
          const index = this.dataSource.data.findIndex(client => client._id === clientId);
          this.dataSource.data[index] = client;
          successMsg = 'Client updated'
        }
        else {
          this.dataSource.data.push(client);
          successMsg = 'Client created'
        }
        this.dataSource.data = [...this.dataSource.data];
        this.snackBar.open(successMsg, 'Success', {
          duration: 2000
        })
      }, err => this.errorHandler(err, 'Failed to created Client'))
  }
  private errorHandler(error: any, message: any) {
    this.isResultsLoading = false;
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }

}
