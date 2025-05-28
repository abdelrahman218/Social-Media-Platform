import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { BackendAdapter } from '../../BackendAdapter/BackendAdapter';
import { SpringBootBackendAdapter } from '../../BackendAdapter/SpringBootBackendAdapter';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private backendAdapter: BackendAdapter = inject(SpringBootBackendAdapter);

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response));
          this.messageService.showPopup('Login successful!', 'success');
          const user = this.backendAdapter.userAdapter([response]);
          this.userService.setCurrentUser(user[0]);
          console.log(this.userService.getCurrentUser()());
          this.router.navigate(['/feed']);
        },
        error: (error) => {
          let errorMessage = 'Login failed. Please try again.';
          if (error.status === 401) {
            errorMessage = 'Invalid email or password. Please try again.';
          } else if (error.status === 0) {
            errorMessage = 'Unable to connect to the server. Please check your internet connection.';
          }
          this.messageService.showPopup(errorMessage, 'error');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      if (!this.email?.valid) {
        this.messageService.showPopup('Please enter a valid email address', 'error');
      } else if (!this.password?.valid) {
        this.messageService.showPopup('Password must be at least 6 characters long', 'error');
      }
    }
  }
}
