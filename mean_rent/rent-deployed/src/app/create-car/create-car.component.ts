import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {AdminService} from '../admin.service';
import {NgForm} from '@angular/forms';



@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit, OnDestroy {

    url = 'https://mean-car-rentals.herokuapp.com';

    selectedFile: any; // File = null;
    fd = new FormData();
    private unsubscribe = new Subject();

  constructor(private http: HttpClient, private adminservice: AdminService) { }

  ngOnInit() {
  }

  onFileSelected(event: any /*{ target: { files: any; File[];  };  } */) {
   this.selectedFile = <File>event.target.files[0];
   this.fd.append('file', this.selectedFile, this.selectedFile.name);
   this.http.post(  'https://mean-car-rentals.herokuapp.com/api/admin/save-image', this.fd).subscribe(res => console.log(res));

  }

    ngOnDestroy() {
      this.unsubscribe.unsubscribe();
    }

    onCreate(form: NgForm) {
    const filename = this.selectedFile.name;
      this.adminservice.createCar(form.value.brand, form.value.model, form.value.power, form.value.seats, filename).subscribe(res => console.log(res));
      form.resetForm();
    }

}
