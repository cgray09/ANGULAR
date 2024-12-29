import { Component, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { distinctUntilChanged, interval, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  currentDate: Signal<string | undefined>;

  constructor() {
    this.currentDate = toSignal(interval(1000).pipe(map(() => {
      const currentDateObj = new Date();
      const currentDateString = `${currentDateObj.toLocaleDateString(undefined, {dateStyle: 'full'})} ${currentDateObj.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'})}`;
      return currentDateString;
    }), distinctUntilChanged()))
   }

  ngOnInit() {
  }

}
