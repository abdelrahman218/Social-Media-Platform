import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const user = this.userService.getCurrentUser()();
    if (user) {
      return true;
    }
    
    this.router.navigate(['/auth/unauthorized']);
    return false;
  }
} 