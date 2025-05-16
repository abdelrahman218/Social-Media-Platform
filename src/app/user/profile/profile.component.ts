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
  Id = Number(this.route.snapshot.paramMap.get('id')) || 0;
  user = signal<User>(this.userService.getCurrentUser()());
  ngOnInit() {
    this.user.set(this.userService.getUserById(this.Id) || {
      id:0,
      name: '',
      email: '',
      bio: '',
      profilePicURL: '',
      gender: 'Male',
      coverPhoto: ''
    });
  }
  isOwnProfile(): boolean {
    return this.Id === this.userService.getCurrentUser()().id;
  }

  isFriend(): boolean {
    return this.userService.isFriend(this.Id);
  }
}
