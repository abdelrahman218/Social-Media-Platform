import { Component,inject } from '@angular/core';
import { UserPostsComponent } from './user-posts/user-posts.component'; 
import { UserService } from '../user.service';
@Component({
  selector: 'app-profile',
  imports: [UserPostsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
private userService = inject(UserService);
user = this.userService.getCurrentUser(); 
}
