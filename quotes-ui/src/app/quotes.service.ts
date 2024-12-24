import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quote } from './quotes/quote';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  constructor(private http: HttpClient) {}

  // Utility to set Authorization header dynamically
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the JWT token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getData(): Observable<Quote[]> {
    return this.http
      .get<Quote[]>(`${baseUrl}/quotes`, { headers: this.getAuthHeaders() })
      .pipe(tap((data) => console.log('Quotes: ', data)));
  }

  // Get a single quote by ID
  getQuote(id: string): Observable<Quote> {
    return this.http
      .get<Quote>(`${baseUrl}/quotes/${id}`, { headers: this.getAuthHeaders() })
      .pipe(tap((data) => console.log('Quote: ', data)));
  }

  // Create a new quote
  createQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(`${baseUrl}/quotes`, quote, {
      headers: this.getAuthHeaders(),
    });
  }

  // Update an existing quote
  updateQuote(id: string, quote: Quote): Observable<Quote> {
    return this.http.put<Quote>(`${baseUrl}/quotes/${id}`, quote, {
      headers: this.getAuthHeaders(),
    });
  }

  // Delete a quote
  deleteQuote(id: string): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/quotes/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
