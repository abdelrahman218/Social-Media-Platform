import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../auth.service';
import { MessageService } from '../../services/message.service';

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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  genders = ['Male', 'Female'];
  maxDate = new Date();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      full_name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      bio: [''],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required, this.ageValidator(13)]],
      isPrivate: [false]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ageValidator(minAge: number) {
    return (control: any) => {
      const birthDate = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age >= minAge ? null : { tooYoung: true };
    };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      const signupData = {
        email: this.signupForm.value.email,
        full_name: this.signupForm.value.full_name,
        password: this.signupForm.value.password,
        bio: this.signupForm.value.bio,
        gender: this.signupForm.value.gender,
        dateOfBirth: this.signupForm.value.dateOfBirth,
        isPrivate: this.signupForm.value.isPrivate
      };

      console.log('Sending signup request with data:', signupData);

      this.authService.signup(signupData).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response));
          
          this.messageService.showPopup('Account created successfully!', 'success');
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.isLoading = false;
          let errorMessage = 'An error occurred during signup. Please try again.';
          
          if (error.status === 409) {
            errorMessage = 'An account with this email already exists.';
          } else if (error.status === 0) {
            errorMessage = 'Unable to connect to the server. Please check your internet connection.';
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          }
          
          this.messageService.showPopup(errorMessage, 'error');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
      this.showFormValidationErrors();
    }
  }

  private showFormValidationErrors() {
    if (this.signupForm.hasError('passwordMismatch')) {
      this.messageService.showPopup('Passwords do not match', 'error');
    } else if (this.signupForm.get('email')?.hasError('email')) {
      this.messageService.showPopup('Please enter a valid email address', 'error');
    } else if (this.signupForm.get('full_name')?.hasError('minlength')) {
      this.messageService.showPopup('Name must be at least 3 characters long', 'error');
    } else if (this.signupForm.get('password')?.hasError('minlength')) {
      this.messageService.showPopup('Password must be at least 8 characters long', 'error');
    } else if (this.signupForm.get('dateOfBirth')?.hasError('tooYoung')) {
      this.messageService.showPopup('You must be at least 13 years old to sign up', 'error');
    } else if (this.signupForm.get('gender')?.hasError('required')) {
      this.messageService.showPopup('Please select your gender', 'error');
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
