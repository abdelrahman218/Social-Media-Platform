import { Component, inject, signal } from '@angular/core';
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
  private _friendStatusChecked = false;
  
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
 
  }

  isOwnProfile(): boolean {
    const currentUser = this.userService.getCurrentUser()();
    return currentUser ? this.email === currentUser.email : false;
  }
  
  isFriend(): boolean {
    if (!this._friendStatusChecked) {
      this.userService.checkIfFriend(this.email);
      this._friendStatusChecked = true;
    }
    return this.userService.isFriendSignal();
  }
}