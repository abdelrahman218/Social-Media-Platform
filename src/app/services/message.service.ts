import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Message, User } from '../app.model';
import { BackendAdapter } from '../BackendAdapter/BackendAdapter';
import { SpringBootBackendAdapter } from '../BackendAdapter/SpringBootBackendAdapter';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080';
  private backendAdapter: BackendAdapter = inject(SpringBootBackendAdapter);

  getMessages(senderEmail: string, receiverEmail: string): Observable<Message[]> {
    console.log('Fetching messages between:', senderEmail, 'and', receiverEmail);
    return this.http.get<any[]>(`${this.apiUrl}/messages`, {
      params: { senderEmail, receiverEmail }
    }).pipe(
      tap(response => {
        console.log('Raw message response:', response);
        console.log('Response type:', typeof response);
        console.log('Is array?', Array.isArray(response));
        if (Array.isArray(response)) {
          console.log('Number of messages:', response.length);
          response.forEach((msg, index) => {
            console.log(`Message ${index}:`, {
              id: msg.id,
              text: msg.content,
              sender: msg.sender,
              receiver: msg.receiver,
              timestamp: msg.timestamp
            });
          });
        }
      }),
      map(messages => {
        console.log('Processing messages:', messages);
        return messages.map(msg => {
          console.log('Processing message:', msg);
          const processedMessage = {
            id: msg.id,
            text: msg.content || '',
            sender: this.backendAdapter.userAdapter([msg.sender])[0],
            reciever: this.backendAdapter.userAdapter([msg.receiver])[0],
            dateCreated: msg.timestamp ? new Date(msg.timestamp) : new Date()
          };
          console.log('Processed message:', processedMessage);
          return processedMessage;
        });
      }),
      tap(processedMessages => console.log('Final processed messages:', processedMessages))
    );
  }

  sendMessage(senderEmail: string, receiverEmail: string, text: string): Observable<Message> {
    console.log('Sending message:', { senderEmail, receiverEmail, text });
    return this.http.post<any>(`${this.apiUrl}/messages`, { text }, {
      params: { senderEmail, receiverEmail }
    }).pipe(
      tap(response => {
        console.log('Raw send message response:', response);
        console.log('Response type:', typeof response);
        console.log('Response fields:', Object.keys(response));
      }),
      map(msg => {
        console.log('Processing sent message:', msg);
        const processedMessage = {
          id: msg.id,
          text: msg.content || text,
          sender: this.backendAdapter.userAdapter([msg.sender])[0],
          reciever: this.backendAdapter.userAdapter([msg.receiver])[0],
          dateCreated: msg.timestamp ? new Date(msg.timestamp) : new Date()
        };
        console.log('Processed sent message:', processedMessage);
        return processedMessage;
      })
    );
  }

  getLatestMessage(userEmail1: string, userEmail2: string): Observable<Message | null> {
    return this.http.get<any>(`${this.apiUrl}/messages/latest`, {
      params: { userEmail1, userEmail2 }
    }).pipe(
      map(msg => {
        if (!msg) return null;
        return {
          id: msg.id,
          text: msg.content || '',
          sender: this.backendAdapter.userAdapter([msg.sender])[0],
          reciever: this.backendAdapter.userAdapter([msg.receiver])[0],
          dateCreated: msg.timestamp ? new Date(msg.timestamp) : new Date()
        };
      })
    );
  }
} 