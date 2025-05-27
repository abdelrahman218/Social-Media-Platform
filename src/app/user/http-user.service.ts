import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../app.model';
import { BackendAdapter } from '../BackendAdapter/BackendAdapter';
import { SpringBootBackendAdapter } from '../BackendAdapter/SpringBootBackendAdapter';

@Injectable({
    providedIn: 'root'
})
export class HttpUserService {
    private apiUrl = 'http://localhost:8080/user';
    private backendAdapter: BackendAdapter = inject(SpringBootBackendAdapter);
    private http = inject(HttpClient);

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}`).pipe(
            map((response: any[]) => this.backendAdapter.userAdapter(response))
        );
    }

    updateUser(email: string, user: Partial<User>): Observable<User> {
        const params = new HttpParams().set('email', email);
        return this.http.put<User>(`${this.apiUrl}/updateUser`, user, { params });
    }

    getFriends(email: string): Observable<User[]> {
        const params = new HttpParams().set('email', email)
        return this.http.get<User[]>(`${this.apiUrl}/getFriends`, { params }).pipe(
            map((response: any[]) => this.backendAdapter.userAdapter(response))
        );
    }

    getUserByEmail(email: string): Observable<User> {
        const params = new HttpParams().set('email', email);
        return this.http.get<any>(`${this.apiUrl}/getUser`, { params }).pipe(
            map((response: any) => {
                if (!response) {
                    throw new Error('User not found');
                }
                return this.backendAdapter.userAdapter([response])[0];
            })
        );
    }
}