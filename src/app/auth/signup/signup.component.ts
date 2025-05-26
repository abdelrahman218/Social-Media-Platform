import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      full_name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      bio: [''],
      isPrivate: [false]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  onSubmit() {
    console.log('Form submitted');
    console.log('Form valid:', this.signupForm.valid);
    console.log('Form values:', this.signupForm.value);
    
    if (this.signupForm.valid) {
      this.isLoading = true;
      const signupData = {
        email: this.signupForm.value.email,
        full_name: this.signupForm.value.full_name,
        password: this.signupForm.value.password,
        bio: this.signupForm.value.bio,
        isPrivate: this.signupForm.value.isPrivate
      };

      console.log('Sending signup request with data:', signupData);

      this.authService.signup(signupData).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          // Store the token in localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response));
          
          this.snackBar.open('Account created successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          console.error('Signup error:', error);
          this.isLoading = false;
          this.snackBar.open(
            error.error?.message || 'An error occurred during signup. Please try again.',
            'Close',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        },
        complete: () => {
          console.log('Signup request completed');
          this.isLoading = false;
        }
      });
    } else {
      console.log('Form validation errors:', this.signupForm.errors);
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        if (control?.errors) {
          console.log(`${key} errors:`, control.errors);
        }
      });
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
