// @ts-nocheck
import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {AdminService} from '../admin.service';
import { MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import {MatDialog} from '@angular/material/dialog'

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  cars: any;
  dataLength: any;
  isLoading = false;
  displayedColumns: string[] = ['brand', 'model', 'reserved_from', 'reserved_till', 'cancel'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator:any; // paginator: MatPaginator;

  constructor(private adminservice: AdminService, private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.adminservice.rentedCars().subscribe(res => {
      const ELEMENT_DATA = [];
      this.cars = res;
      this.cars.forEach((car: { car_id: any; brand: any; model: any; fromDate: any; untilDate: any; email: any }) => {
        if (car.email === localStorage.getItem('email')) {
          const id = car.car_id;
          const from = car.fromDate;
          const until = car.untilDate;
          const brand = car.brand;
          const model = car.model;
          ELEMENT_DATA.push({
            car_id: id,
            fromDate: from, 
            untilDate: until,
            brand: brand, 
            model: model
          });
        }  
      });
      this.dataLength = ELEMENT_DATA.length;
      this.dataSource.data = ELEMENT_DATA;
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  }

  onCancel(element: any) {
    this.adminservice.cancelRent(element.car_id, element.fromDate, element.untilDate).subscribe(res => {
     this.adminservice.rentedCars().subscribe(res3 => {
         const ELEMENT_DATA = [];
         this.cars = res3;
         this.cars.forEach((car: { car_id: any; brand: any; model: any; fromDate: any; untilDate: any; }) => {
             const id = car.car_id;
             const from = car.fromDate;
             const until = car.untilDate;
             const brand = car.brand;
              const model = car.model;
             ELEMENT_DATA.push({
               car_id: id, 
               fromDate: from, 
               untilDate: until,
               brand: brand, 
              model: model
            });
         });
         this.dataLength = ELEMENT_DATA.length;
         this.dataSource.data = ELEMENT_DATA;
         this.dataSource.paginator = this.paginator;
     });
    });
    this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
  });
  }
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-message.html',
})
export class DialogOverviewExampleDialog {

  constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: {}) {}

  onNoClick(): void {
      this.dialogRef.close();
  }

}







