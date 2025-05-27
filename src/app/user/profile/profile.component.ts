import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserService } from '../user.service';
import { User } from '../../app.model';

@Component({
  selector: 'app-profile',
  imports: [UserPostsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  
  email = this.route.snapshot.paramMap.get('email') || '';
  
  user = signal<User>(this.userService.getUserByEmail(this.email) || {
    id: 0,
    name: '',
    email: '',
    bio: '',
    profilePicURL: '',
    gender: 'Male',
    coverPhoto: ''
  });
  
   constructor() {
    // Initial user lookup
    effect(() => {
      console.log('[Effect] Looking up user by email:', this.email);
      const found = this.userService.getUserByEmail(this.email);
      this.user.set(found || {
        id: 0,
        name: '',
        email: '',
        bio: '',
        profilePicURL: '',
        gender: 'Male',
        coverPhoto: ''
      });
    });

    // Separate friends fetch that doesn't trigger user updates
    effect(() => {
      const userEmail = this.user().email;
      if (userEmail) {
        console.log('[Effect] Fetching friends for:', userEmail);
        this.userService.getFriends(userEmail);
      }
    }, { allowSignalWrites: false });
  }

  isOwnProfile(): boolean {
    return this.email === this.userService.getCurrentUser()().email;
  }
  
  isFriend(): boolean {
    this.userService.checkIfFriend(this.email);
    return this.userService.isFriendSignal();
  }
}

