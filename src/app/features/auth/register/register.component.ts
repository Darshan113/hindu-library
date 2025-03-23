import { Component } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchValidator } from './match-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private translationService: TranslationService) {
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
      // TODO: Integrate with Express API for registration
      console.log('Register form submitted:', this.registerForm.value);
      this.router.navigate(['/auth/login']);
    }
  }
}
