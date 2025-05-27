import { Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideFeedComponent } from '../../side-feed/side-feed.component';
import { UserService } from '../../user.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { interval } from 'rxjs';
import { User, Message } from '../../../app.model';

@Component({
  selector: 'app-direct-messaging',
  standalone: true,
  imports: [CommonModule, FormsModule, SideFeedComponent],
  templateUrl: './direct-messaging.component.html',
  styleUrl: './direct-messaging.component.scss'
})
export class DirectMessagingComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  userService = inject(UserService);
  messageService = inject(MessageService);
  route = inject(ActivatedRoute);
  user = this.userService.getCurrentUser();
  foundFriend: User | null = null;

  constructor() {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const friendEmail = params['email'];
      console.log('Friend email:', friendEmail);
      const user = this.userService.getUserByEmail(friendEmail);
      this.foundFriend = user || null;
      console.log('Found friend:', this.foundFriend);
      
      if (this.foundFriend) {
        this.loadMessageHistory();
        
        // Poll for new messages every 5 seconds
        interval(5000).subscribe(() => {
          this.loadMessageHistory();
        });
      }
    });
  }

  loadMessageHistory() {
    if (this.foundFriend && this.user()) {
      this.messageService.getMessages(this.user().email, this.foundFriend.email)
        .subscribe({
          next: (messages) => {
            this.messages = messages;
          },
          error: (error) => {
            console.error('Error loading messages:', error);
          }
        });
    }
  }
  
  sendMessage() {
    if (this.newMessage.trim() && this.foundFriend && this.user()) {
      this.messageService.sendMessage(
        this.user().email,
        this.foundFriend.email,
        this.newMessage
      ).subscribe({
        next: (message) => {
          this.messages.push(message);
          this.newMessage = '';
        },
        error: (error) => {
          console.error('Error sending message:', error);
        }
      });
    }
  }
}
