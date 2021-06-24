import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../admin.service';
import {MatPaginator, MatTable, MatTableDataSource} from '@angular/material';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, OnDestroy {

    private unsubscribe = new Subject();

  displayedColumns = ['email', 'isAdmin', 'edit'];
  dataSource = new MatTableDataSource();
  users: any;

  // "@ViewChild" means "MatPaginator" is being injected from
  // a parent component 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table') table: MatTable<any>;

  constructor(private adminservice: AdminService) { }

  ngOnInit() {
    this.adminservice.getUsers().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      const ELEMENT_DATA = [];
      this.users = res;
      this.users.forEach(user => {
        const email = user.email;
        const isAdmin = user.isAdmin;
        ELEMENT_DATA.push({email: email, isAdmin: isAdmin});
      });
      this.dataSource.data = ELEMENT_DATA;
      this.dataSource.paginator = this.paginator;
      console.log(ELEMENT_DATA);
    });
  }

   onDelete(element: any) {
     // "pipe(takeUntil(this.unsubscribe))" is to prevent memory leaks
     // to remove the subscriptions after the component is unmounted
     // explains it in video 62
    this.adminservice.deleteUser(element.email).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      // all this logic since the backend for this delete returns all the users
      // remaining after deleting the user  
      const ELEMENT_DATA = [];
        this.users = res;
        this.users.forEach(user => {
            const email = user.email;
            const isAdmin = user.isAdmin;
            ELEMENT_DATA.push({email: email, isAdmin: isAdmin});
        });
        this.dataSource.data = ELEMENT_DATA;
        this.dataSource.paginator = this.paginator;
    });
    }

    onAdmin(element: any) {
      this.adminservice.makeAdmin(element.email).pipe(takeUntil(this.unsubscribe)).subscribe(res => {  
        const ELEMENT_DATA = [];
          this.users = res;
          this.users.forEach(user => {
              const email = user.email;
              const isAdmin = user.isAdmin;
              ELEMENT_DATA.push({email: email, isAdmin: isAdmin});
          });
          this.dataSource.data = ELEMENT_DATA;
          this.dataSource.paginator = this.paginator;
      });
    }

    ngOnDestroy() {
      this.unsubscribe.unsubscribe();
    }

}


