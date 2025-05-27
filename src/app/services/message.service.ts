import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, User } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080';

  getMessages(senderEmail: string, receiverEmail: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages`, {
      params: { senderEmail, receiverEmail }
    });
  }

  sendMessage(senderEmail: string, receiverEmail: string, text: string): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/messages`, { text }, {
      params: { senderEmail, receiverEmail }
    });
  }
} 