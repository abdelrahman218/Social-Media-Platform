import { Component, signal, inject, OnInit } from '@angular/core';
import { User, Message } from '../../../app.model';
import { UserService } from '../../user.service';
import { SideFeedComponent } from '../side-feed.component';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [SideFeedComponent, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  userService = inject(UserService);
  messageService = inject(MessageService);
   user: User | null = this.userService.getCurrentUser()();
  router = inject(Router);
  friends = signal<User[]>([]);
  latestMessages = new Map<string, Message>();
  
  constructor() {
    const user = this.userService.getCurrentUser();
    this.friends.set(
      this.userService.getAllUsers()().filter((u) => {
        const currentUser = user();
        return currentUser && currentUser.friendId?.includes(u.id);
      })
    );
const currentUser = this.user;
if (currentUser) {
  this.userService.getFriends(currentUser.email).subscribe({
    next: (friendsList: User[]) => {
      if (Array.isArray(friendsList)) {
        friendsList.forEach((friend: User) => {
          const currentUserEmail = this.user?.email;
          if (currentUserEmail && friend.email) {
            this.messageService.getLatestMessage(currentUserEmail, friend.email)
              .subscribe({
                next: (message: Message | null) => {
                  if (message) {
                    this.latestMessages.set(friend.email, message);
                  }
                },
                error: (error) => {
                  console.error('Error loading latest message:', error);
                }
              });
          }
        });
      }
    },
    error: (error) => {
      console.error('Error loading friends list:', error);
    }
  });
}
  }

  ngOnInit() {
    // Component initialization logic if needed
  }

  openDM(friend: User) {
    if (friend.email) {
      this.router.navigate(['/user/direct-messages', friend.email]);
    } else {
      console.error('Friend email is undefined');
    }
  }

  getLatestMessage(friend: User): string {
    const message = this.latestMessages.get(friend.email);
    if (!message) return 'No messages yet';
    return message.text;
  }

  isMessageFromMe(friend: User): boolean {
    const message = this.latestMessages.get(friend.email);
    return message?.sender.email === this.user?.email;
  }
}
