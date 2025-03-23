import { Component } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchValidator } from './match-validators';
import { AuthService, RegisterCredentials } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private translationService: TranslationService,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: matchValidator('password', 'confirmPassword') });
  }

  ngOnInit(): void {}

  onRegister(): void {
    if (this.registerForm.valid) {
      // this.loading = true;
      const credentials: RegisterCredentials = {
        name: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value
      };
      this.authService.register(credentials).subscribe({
        next: () => {
          // this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registration successful! Please login.'
          });
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          // this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Registration failed. Please try again.'
          });
        }
      });
    }
  }
}
