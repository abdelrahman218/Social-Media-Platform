import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-popup-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" 
         [class]="'popup-message ' + message.type"
         [@fadeInOut]>
      {{ message.message }}
    </div>
  `,
  styles: [`
    .popup-message {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    }

    .error {
      background-color: #c62828;
      box-shadow: 0 2px 8px rgba(198, 40, 40, 0.3);
    }

    .success {
      background-color: #2e7d32;
      box-shadow: 0 2px 8px rgba(46, 125, 50, 0.3);
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class PopupMessageComponent implements OnInit {
  message: { message: string, type: 'error' | 'success' } | null = null;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.popupMessage$.subscribe(message => {
      this.message = message;
    });
  }
} 