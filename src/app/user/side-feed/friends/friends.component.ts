import { Component, inject, signal, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../../app.model';
import { SideFeedComponent } from '../side-feed.component';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../services/message.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [SideFeedComponent, CommonModule, RouterModule],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent implements OnInit {
  userService = inject(UserService);
  messageService = inject(MessageService);
  user: User | null = this.userService.getCurrentUser()();
  friends = signal<User[]>([]);

  constructor() {}

  ngOnInit() {
    const currentUser = this.user;
    if (currentUser) {
      this.userService.getFriends(currentUser.email).subscribe({
        next: (friendsList: User[]) => {
          console.log('Friends loaded:', friendsList);
          this.friends.set(friendsList);
        },
        error: (error) => {
          console.error('Error loading friends:', error);
          this.messageService.showPopup('Error loading friends list', 'error');
        }
      });
    }
  }

}
