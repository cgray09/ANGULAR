import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private userservice: UserService, private router: Router, 
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    const email = form.value.email;
    const pass = form.value.password;
    this.userservice.createUser(email, pass).subscribe(res => {
      this.snackBar.open('Signup successful','Success',{duration:10000})
      this.router.navigate(['/']);
      console.log(res);
    });

  }



}
