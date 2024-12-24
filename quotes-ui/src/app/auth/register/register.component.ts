import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        console.log('Registration successful:', res);
        this.router.navigate(['/login']); // Redirect to login on success
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.errorMessage = 'Registration failed. Please try again.';
      },
    });
  }
}
