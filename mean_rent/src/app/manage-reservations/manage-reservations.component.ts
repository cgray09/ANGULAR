import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {AdminService} from '../admin.service';



@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrls: ['./manage-reservations.component.css']
})
export class ManageReservationsComponent implements OnInit {

    cars: any;

    displayedColumns: string[] = ['car_id', 'reserved_from', 'reserved_till', 'cancel'];
    dataSource = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private adminservice: AdminService) { }

  ngOnInit() {
      this.adminservice.rentedCars().subscribe(res => {
          const ELEMENT_DATA = [];
          this.cars = res;
          this.cars.forEach(car => {
              const id = car.car_id;
              const from = car.fromDate;
              const until = car.untilDate;
              ELEMENT_DATA.push({car_id: id, fromDate: from, untilDate: until});
          });
          this.dataSource.data = ELEMENT_DATA;
          this.dataSource.paginator = this.paginator; // makes the paginator
                                                      // appear in the ui
      });
  }


  onCancel(element: any) {
      this.adminservice.cancelRent(element.car_id, element.fromDate, element.untilDate).subscribe(res => {
       this.adminservice.rentedCars().subscribe(res3 => {
           const ELEMENT_DATA = [];
           this.cars = res3;
           this.cars.forEach(car => {
               const id = car.car_id;
               const from = car.fromDate;
               const until = car.untilDate;
               ELEMENT_DATA.push({car_id: id, fromDate: from, untilDate: until});
           });
           this.dataSource.data = ELEMENT_DATA;
           this.dataSource.paginator = this.paginator;
       });
      });
  }


}




