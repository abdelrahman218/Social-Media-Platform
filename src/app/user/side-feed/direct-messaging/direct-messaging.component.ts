import { Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideFeedComponent } from '../../side-feed/side-feed.component';
import { UserService } from '../../user.service';

interface Message {
  id: number;
  content: string;
  sender: string;
  timestamp: Date;
}

interface User {
  id: number;
  name: string;
  profilePicture: string;
}

@Component({
  selector: 'app-direct-messaging',
  standalone: true,
  imports: [CommonModule, FormsModule, SideFeedComponent],
  templateUrl: './direct-messaging.component.html',
  styleUrl: './direct-messaging.component.scss'
})
export class DirectMessagingComponent implements OnInit {
  @Input() friend!: User;
  messages: Message[] = [];
  newMessage: string = '';
  userService = inject(UserService);
  user = this.userService.getCurrentUser();

  ngOnInit() {
    if (this.friend) {
      this.loadMessageHistory();
    }
  }

  loadMessageHistory() {
    // TODO: Replace this with actual API call to get message history
    this.messages = [
      {
        id: 1,
        content: 'Hey, how are you?',
        sender: this.friend.name,
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: 2,
        content: 'I\'m good, thanks! How about you?',
        sender: 'me',
        timestamp: new Date(Date.now() - 3500000)
      }
    ];
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const newMsg: Message = {
        id: this.messages.length + 1,
        content: this.newMessage,
        sender: 'me',
        timestamp: new Date()
      };
      this.messages.push(newMsg);
      this.newMessage = '';
      // TODO: Add API call to save message
    }
  }
}
