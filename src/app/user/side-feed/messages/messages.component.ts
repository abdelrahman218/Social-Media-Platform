import { Component, signal, inject, OnInit } from '@angular/core';
import { User, Message } from '../../../app.model';
import { UserService } from '../../user.service';
import { SideFeedComponent } from '../side-feed.component';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';

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
  
  constructor() {}

  ngOnInit() {
    const currentUser = this.user;
    if (currentUser) {
      // Load friends list
      this.userService.getFriends(currentUser.email).subscribe({
        next: (friendsList: User[]) => {
          console.log('Friends loaded:', friendsList);
          this.friends.set(friendsList);
          
          // Load latest messages for each friend
          friendsList.forEach((friend: User) => {
            if (friend.email) {
              this.messageService.getLatestMessage(currentUser.email, friend.email)
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
        },
        error: (error) => {
          console.error('Error loading friends list:', error);
        }
      });
    }
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
