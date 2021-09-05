import { Component, OnInit, OnDestroy } from "@angular/core";


@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
//   userIsAuthenticated = false;
//   private authListenerSubs: Subscription;

  constructor() {}

  ngOnInit() {
    // this.userIsAuthenticated = this.authService.getIsAuth();
    // this.authListenerSubs = this.authService
    //   .getAuthStatusListener()
    //   .subscribe(isAuthenticated => {
    //     this.userIsAuthenticated = isAuthenticated;
    //   });
  }

//   onLogout() {
//     this.authService.logout();
//   }

//   ngOnDestroy() {
//     this.authListenerSubs.unsubscribe();
//   }
}