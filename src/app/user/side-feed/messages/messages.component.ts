import { Component, signal,inject } from '@angular/core';
import { User } from '../../../app.model';
import { UserService } from '../../user.service';
import { SideFeedComponent } from '../side-feed.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-messages',
  imports: [SideFeedComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  userService = inject(UserService);
  user = this.userService.getCurrentUser();
  router = inject(Router);
  friends = this.userService.friendList; 
  
  constructor() {
    const user = this.userService.getCurrentUser();
    this.friends.set(
      this.userService.getAllUsers()().filter((u) => {
        const currentUser = user();
        return currentUser && currentUser.friendId?.includes(u.id);
      })
    );
    const currentUser = this.user();
    if (currentUser) {
      this.userService.getFriends(currentUser.email);
    }
  }
  openDM(friend:User) {
    this.router.navigate(['/user/direct-messages', friend.id]);
  }
}
