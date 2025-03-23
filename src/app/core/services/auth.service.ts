import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseHttpService } from './base-http.service';
import { TokenService } from './token.service';
import { API_ENDPOINTS } from '../constants/api-endpoints.constants';
import { Router } from '@angular/router';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private baseHttp: BaseHttpService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.baseHttp.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials).pipe(
      tap(response => this.tokenService.setSession(response.token, response.user))
    );
  }

  register(credentials: RegisterCredentials): Observable<AuthResponse> {
    return this.baseHttp.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, credentials).pipe(
      tap(response => this.tokenService.setSession(response.token, response.user))
    );
  }

  logout(): void {
    this.baseHttp.post(API_ENDPOINTS.AUTH.LOGOUT, {}).subscribe({
      next: () => {
        this.tokenService.clearSession();
        this.router.navigate(['/']);
      },
      error: () => {
        this.tokenService.clearSession();
        this.router.navigate(['/']);
      }
    });
  }

  isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }

  getCurrentUser(): { id: string; name: string; email: string } | null {
    return this.tokenService.getCurrentUser();
  }

  getToken(): string | null {
    return this.tokenService.getToken();
  }
}