import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtService, AuthService } from '../../../core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-footer-toolbar',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  logout() {
    this.authService.logOut().subscribe(
      data => {
        console.log(data);
      },
      err => this.errorHandler(err, 'Something went wrong'),
      () => {
        this.jwtService.destroyToken();
        this.router.navigate(['/login']);
      }
    );
  }
  private errorHandler(error: any, message: any) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
