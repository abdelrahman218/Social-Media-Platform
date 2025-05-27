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
  friends=signal<User[]>([]);
  userService = inject(UserService);
  user = this.userService.getCurrentUser();
  router = inject(Router);
  constructor() {
    const user = this.userService.getCurrentUser();
    this.friends.set(this.userService.getAllUsers()().filter((u) => user().friendId?.includes(u.id)));
  }
  openDM(friend:User) {
    this.router.navigate(['/user/direct-messages', friend.id]);
  }
}
