import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: number;
  content: string;
  sender: string;
  timestamp: Date;
}

interface User {
  name: string;
  profilePicture: string;
}

@Component({
  selector: 'app-direct-messaging',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './direct-messaging.component.html',
  styleUrl: './direct-messaging.component.scss'
})
export class DirectMessagingComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  recipient: User = {
    name: 'John Doe',
    profilePicture: 'assets/default-profile.png' // You can replace this with actual profile picture
  };

  ngOnInit() {
    // Add some sample messages
    this.messages = [
      {
        id: 1,
        content: 'Hey, how are you?',
        sender: 'John Doe',
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
      this.messages.push({
        id: this.messages.length + 1,
        content: this.newMessage,
        sender: 'me',
        timestamp: new Date()
      });
      this.newMessage = '';
    }
  }
}
