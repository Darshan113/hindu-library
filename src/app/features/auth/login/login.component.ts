import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';
import { AuthService, LoginCredentials } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private translationService: TranslationService,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void { }

  onLogin(): void {
    if (this.loginForm.valid) {
      // this.loading = true;
      const credentials: LoginCredentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: () => {
          // this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login successful!'
          });
          // this.router.navigate(['/dashboard']);
          console.log('Login form submitted:', this.loginForm.value);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          // this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Login failed. Please try again.'
          });
        }
      });
    }
  }
}
