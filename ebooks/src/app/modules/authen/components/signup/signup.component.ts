// @ts-nocheck
import { Component, OnInit } from '@angular/core'; 
import { AuthService } from '../../services/auth.service';
import { NgForm } from "@angular/forms";
import { NavbarService } from '../../../menu/services/navbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  constructor(public nav: NavbarService, private authService: AuthService) {}

  ngOnInit() {
    this.nav.hide();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  onLogin(){
    this.authService.loginWithGoogle();
  }

  ngOnDestroy() {
    this.nav.show();
  }
}