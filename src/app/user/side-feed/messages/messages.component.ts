import { Component, signal,inject } from '@angular/core';
import { User } from '../../../app.model';
import { UserService } from '../../user.service';
import { SideFeedComponent } from '../side-feed.component';
@Component({
  selector: 'app-messages',
  imports: [SideFeedComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  userService = inject(UserService);
  user = this.userService.getCurrentUser();
  friends = this.userService.friendList; 

  constructor() {
    const currentUser = this.user();
    this.userService.getFriends(currentUser.email);
  }
}
