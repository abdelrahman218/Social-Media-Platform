import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface SignupRequest {
  email: string;
  full_name: string;
  password: string;
  bio?: string;
  profile_picture_name?: string;
  isPrivate: boolean;
}

export interface SignupResponse {
  email: string;
  full_name: string;
  bio?: string;
  profile_picture_name?: string;
  isPrivate: boolean;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  full_name: string;
  bio?: string;
  profile_picture_name?: string;
  isPrivate: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
    console.log('AuthService initialized with API URL:', this.apiUrl);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }

  signup(signupData: SignupRequest): Observable<SignupResponse> {
    console.log('Creating signup request with data:', signupData);
    return this.http.post<SignupResponse>(`${this.apiUrl}/users/signup`, signupData).pipe(
      tap({
        next: (response) => console.log('Signup response:', response),
        error: (error) => console.error('Signup error:', error)
      }),
      catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<LoginResponse> {
    console.log('Creating login request with data:', email, password);
    const loginData: LoginRequest = { email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/users/login`, loginData).pipe(
      tap({
        next: (response) => console.log('Login response:', response),
        error: (error) => console.error('Login error:', error)
      }),
      catchError(this.handleError)
    );
  }
} 