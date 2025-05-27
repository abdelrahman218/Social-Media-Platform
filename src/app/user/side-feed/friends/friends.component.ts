import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../user.service';
import { User, UserEssential } from '../../../app.model';
import { SideFeedComponent } from '../side-feed.component';
@Component({
  selector: 'app-friends',
  imports: [SideFeedComponent],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent {
  userService = inject(UserService);
  user = this.userService.getCurrentUser();
  friends = this.userService.friendList; 

  constructor() {
    const currentUser = this.user();
    if (!currentUser) {
      console.error('No current user found');
      return;
    }
    this.userService.getFriends(currentUser.email);
  }
  removeFriend(friendId: number) {
//untill done in service
  }
}
