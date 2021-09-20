// @ts-nocheck
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy  {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private backEndService: BackEndService, private authService: AuthService) {}

  ngOnInit(): void {
    this.onFetch();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSave() {
    console.log('onSave() Called!');
    this.backEndService.saveData();
  }

  onFetch() {
    console.log('onFetch() called!');
    this.backEndService.fetchData();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
