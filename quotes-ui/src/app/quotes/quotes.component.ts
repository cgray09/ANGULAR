import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { Observable } from 'rxjs';
import { Quote } from './quote';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent implements OnInit {
  quotes!: Observable<Quote[]>;
  loading: boolean = true; // Add loading state

  constructor(
    private quotesService: QuotesService,
    public AuthService: AuthService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true; // Start loading
    this.quotes = this.quotesService.getData();
    this.quotes.subscribe(
      () => (this.loading = false), // Stop loading on success
      () => (this.loading = false) // Stop loading on error
    );
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return { background: color };
  }

  onDelete(id: any) {
    this.loading = true; // Show spinner during delete
    this.quotesService.deleteQuote(id).subscribe(
      () => {
        this.getData(); // Refresh the list
        console.log('Quote Deleted');
      },
      () => (this.loading = false) // Stop loading on error
    );
  }

  isQuoteOwner(authorId: string): boolean {
    if (!this.AuthService.isAuthenticated()) {
      return false; // User is not authenticated
    }
    const currentUserId = this.AuthService.getCurrentUserId(); // Replace with your method to get the current user's ID
    return currentUserId === authorId;
  }
}
