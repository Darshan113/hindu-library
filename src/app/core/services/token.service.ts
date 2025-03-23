import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AuthState {
  token: string | null;
  user: { id: string; name: string; email: string } | null;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private authState = new BehaviorSubject<AuthState>({
    token: null,
    user: null
  });

  authState$ = this.authState.asObservable();

  constructor() {
    // Initialize state from localStorage on app load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    let user: { id: string; name: string; email: string } | null = null;
    if (userData) {
      try {
        user = userData ? JSON.parse(userData) : null;
        // Validate that user has the expected properties
        if (!user || !user.id || !user.name || !user.email) {
          user = null; // Reset if the parsed data is invalid
          localStorage.removeItem('user'); // Clean up invalid data
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user'); // Clean up invalid data
      }
    }

    if (token && user) {
      this.authState.next({ token, user });
    } else {
      // If either token or user is missing/invalid, clear both to maintain consistency
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.authState.next({ token: null, user: null });
    }
  }

  setSession(token: string, user: { id: string; name: string; email: string }): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authState.next({ token, user });
  }

  clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authState.next({ token: null, user: null });
  }

  getToken(): string | null {
    return this.authState.value.token;
  }

  getCurrentUser(): { id: string; name: string; email: string } | null {
    return this.authState.value.user;
  }

  isLoggedIn(): boolean {
    return !!this.authState.value.token;
  }
}