// @ts-nocheck
import {Component, Inject} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import { MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import {MatDialog} from '@angular/material/dialog'



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    token: any;

    constructor(private userservice: UserService, private router: Router, private dialog: MatDialog) {}

onlogin(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        this.userservice.loginUser(email, password).subscribe(result => {
            this.userservice.authenticated.next(true);
           const admin = result.admin;
           const token = result.token;
           localStorage.setItem('email', result.email);
           this.userservice.isAdmin.next(admin);
               const expires = result.expiresIn;
               if (token) {
                   this.userservice.setTimer(expires);
                   const now = new Date();
                   const expirationDate = new Date(now.getTime() + expires * 1000);
                   this.userservice.saveuserData(token, expirationDate, admin);
                   this.router.navigate(['/main']);
               }
        },
        error => {
          this.dialog.open(DialogOverviewExampleDialog, {
                width: '300px',
            });
        }
      );

        
}

autoAuthUser() {
      const authinfo = this.userservice.getuserData();
      if (!authinfo) {
          return;
      }
      const now = new Date();
      const expiresIn = authinfo.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
          this.token = authinfo.token;
          this.userservice.authenticated.next(true);
      }
}

}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-login-message.html',
})
export class DialogOverviewExampleDialog {

  constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: {}) {}

  onNoClick(): void {
      this.dialogRef.close();
  }

}
