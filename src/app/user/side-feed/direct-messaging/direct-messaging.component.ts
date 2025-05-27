import { Component, OnInit, inject, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideFeedComponent } from '../../side-feed/side-feed.component';
import { UserService } from '../../user.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { interval } from 'rxjs';
import { User, Message } from '../../../app.model';
import { HttpUserService } from '../../http-user.service';

@Component({
  selector: 'app-direct-messaging',
  standalone: true,
  imports: [CommonModule, FormsModule, SideFeedComponent],
  templateUrl: './direct-messaging.component.html',
  styleUrl: './direct-messaging.component.scss'
})
export class DirectMessagingComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  messages: Message[] = [];
  newMessage: string = '';
  userService = inject(UserService);
  messageService = inject(MessageService);
  httpUserService = inject(HttpUserService);
  route = inject(ActivatedRoute);
  user: User | null = this.userService.getCurrentUser()();
  foundFriend: User | null = null;
  private shouldScroll = false;

  constructor() {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const friendEmail = params['email'];
      if (!friendEmail) {
        console.error('No email parameter provided');
        return;
      }
      
      console.log('Friend email:', friendEmail);
      
      // Fetch user from backend
      this.httpUserService.getUserByEmail(friendEmail).subscribe({
        next: (user: User) => {
          if (!user) {
            console.error('User not found');
            return;
          }
          this.foundFriend = user;
          console.log('Found friend:', this.foundFriend);
          
          if (this.foundFriend) {
            this.loadMessageHistory();
            
            // Poll for new messages every 5 seconds
            interval(5000).subscribe(() => {
              this.loadMessageHistory();
            });
          }
        },
        error: (error: Error) => {
          console.error('Error fetching user:', error);
        }
      });
    });
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private scrollToBottom(): void {
    try {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  loadMessageHistory() {
    if (this.foundFriend && this.user) {
      console.log('Loading message history between:', this.user!.email, 'and', this.foundFriend!.email);
      this.messageService.getMessages(this.user!.email, this.foundFriend!.email)
        .subscribe({
          next: (messages) => {
            console.log('Received messages:', messages);
            const previousLength = this.messages.length;
            this.messages = messages;
            console.log('Updated messages array:', this.messages);
            // Only scroll if new messages were added
            if (messages.length > previousLength) {
              this.shouldScroll = true;
            }
          },
          error: (error) => {
            console.error('Error loading messages:', error);
          }
        });
    } else {
      console.log('Cannot load messages - missing user or friend:', {
        currentUser: this.user,
        foundFriend: this.foundFriend
      });
    }
  }
  
  sendMessage() {
    if (this.newMessage.trim() && this.foundFriend && this.user) {
      console.log('Sending message:', {
        from: this.user?.email,
        to: this.foundFriend.email,
        text: this.newMessage
      });
      
      this.messageService.sendMessage(
        this.user!.email,
        this.foundFriend.email,
        this.newMessage
      ).subscribe({
        next: (message) => {
          console.log('Message sent successfully:', message);
          this.messages.push(message);
          this.newMessage = '';
          this.shouldScroll = true;
        },
        error: (error) => {
          console.error('Error sending message:', error);
        }
      });
    } else {
      console.log('Cannot send message - missing data:', {
        messageText: this.newMessage,
        currentUser: this.user,
        foundFriend: this.foundFriend
      });
    }
  }
}
