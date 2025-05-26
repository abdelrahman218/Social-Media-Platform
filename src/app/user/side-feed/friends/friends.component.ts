import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../../app.model';
import { SideFeedComponent } from '../side-feed.component';
@Component({
  selector: 'app-friends',
  imports: [SideFeedComponent],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent {
  friends=signal<User[]>([]);
  userService = inject(UserService);
  user = this.userService.getCurrentUser();
constructor() {
    const user = this.userService.getCurrentUser();
    this.friends.set(this.userService.getAllUsers()().filter((u) => user().friendId?.includes(u.id)));
  }
  removeFriend(friendId: number) {
//untill done in service
  }
}
