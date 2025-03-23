import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private translationService: TranslationService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    if (this.loginForm.valid) {
      // TODO: Integrate with Express API for login
      console.log('Login form submitted:', this.loginForm.value);
      this.router.navigate(['/dashboard']);
    }
  }
}
