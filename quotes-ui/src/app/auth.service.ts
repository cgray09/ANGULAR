import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // Replace with your backend URL
  

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }) {
    this.http.post<any>(`${baseUrl}/auth/login`, credentials)
      .subscribe(response => {
        // Ensure 'access_token' exists in the response
        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token); // Store token
          this.router.navigate(['/quotes']); // Navigate to quotes page
        } else {
          console.error('Invalid token response', response);
        }
      }, error => {
        console.error('Login failed', error);
      });
  }

  register(user: { email: string; password: string }) {
    return this.http.post(`${baseUrl}/auth/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Check if the token exists
  }
  
  getCurrentUserId(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null; // Explicitly return null if no token is present
  
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken.sub : null; // Return the user ID or null
  }  
  
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  
}
