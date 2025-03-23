import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { TokenService } from '../../core/services/token.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userName: string | null = null;
  recentBooks: Book[] = [];
  loading = false;

  constructor(
    private tokenService: TokenService,
    // private bookService: BookService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const user = this.tokenService.getCurrentUser();
    this.userName = user ? user.name : null;
    this.loadRecentlyViewedBooks();
  }

  loadRecentlyViewedBooks() {
    // this.loading = true;
    // this.bookService.getRecentlyViewedBooks().subscribe({
    //   next: (books) => {
    //     this.recentBooks = books;
    //     this.loading = false;
    //   },
    //   error: (error) => {
    //     this.loading = false;
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: error.message || 'Failed to load recently viewed books.'
    //     });
    //   }
    // });
  }
}


interface Book {
  id: string;
  title: string;
  description: string;
}