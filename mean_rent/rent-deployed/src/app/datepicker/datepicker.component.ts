import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {UserService} from '../user.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-date-picker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  constructor(private userservice: UserService) { }

  ngOnInit() {}

  onSearch(form: NgForm) {
    const from0 = new Date(form.value.dateInput[0]);
    const until0 = new Date(form.value.dateInput[1]);
    from0.setDate(from0.getDate() + 1);
    until0.setDate(until0.getDate() + 1);
    const from = moment(from0).format('YYYYMMDD');
    const until = moment(until0).format('YYYYMMDD');
    localStorage.setItem('from', from);
    localStorage.setItem('until', until);
    this.userservice.getCars(from, until).pipe(takeUntil(this.unsubscribe)).subscribe(res => this.userservice.selectedCars.next(res));
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }


}
