import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserService } from '../user.service';
import { User } from '../../app.model';

@Component({
  selector: 'app-profile',
  imports: [UserPostsComponent,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private _friendStatusChecked = false;
  
  email = this.route.snapshot.paramMap.get('email') || '';
  
  user = signal<User>({
    id: 0,
    name: '',
    email: '',
    bio: '',
    profilePicURL: '',
    gender: 'Male',
    coverPhoto: '',
    password: ''
  });
  
  ngOnInit() {
    this.userService.getUserByEmail(this.email).subscribe((user) => {
      if (user) {
        this.user.set(user);
      }
    });
  }

  isOwnProfile(): boolean {
    const currentUser = this.userService.getCurrentUser()();
    console.log(currentUser);
    return currentUser ? this.email === currentUser.email : false;
  }
  
  isFriend(): boolean {
    if (!this._friendStatusChecked) {
      this.userService.checkIfFriend(this.email);
      this._friendStatusChecked = true;
    }
    return this.userService.isFriendSignal();
  }
  togglePrivateMode(email:string){
    this.userService.togglePrivateMode(email).subscribe({
      next: () => {
        console.log('Private mode toggled successfully');
        window.location.reload();
      },
      error: (error) => {
        console.error('Error toggling private mode:', error);
      }
    });
  }
}