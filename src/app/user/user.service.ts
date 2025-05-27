import { inject, Injectable, signal } from '@angular/core';
import { Friend, User, UserEssential } from '../app.model';
import { dummyUsers } from './dummy-users';
import { HttpUserService } from './http-user.service';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private users = signal<User[]>(dummyUsers);
    private currentUser = signal<User>(this.loadUserFromStorage() || dummyUsers[8]);
    private userHttp = inject(HttpUserService);
    friendList = signal<User[]>([]);

    private loadUserFromStorage(): User | null {
        const stored = localStorage.getItem('user');
        if (!stored) return null;

        try {
            const user = JSON.parse(stored);
            // optionally validate shape
            return user;
        } catch (e) {
            console.error('Failed to parse stored user:', e);
            return null;
        }
    }

    getAllUsers() {
        this.userHttp.getUsers().subscribe((users: User[]) => {
            this.users.set(users);
        });
        return this.users;
    }

    getCurrentUser() {
        return this.currentUser;
    }
    setCurrentUser(user: User) {
        this.currentUser.set(user);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Current user set to:', user);
    }

    register(user: User) {
        if (this.users().find(u => u.email === user.email)) {
            throw new Error('User with this email already exists');
        }
        this.users.update(users => [...users, user]);
        return user;
    }

    updateUser(email: string, updates: Partial<User>) {
        this.users.update(users =>
            users.map(user => user.email === email ? { ...user, ...updates } : user)
        );
    }
    getUserById(id: number) {
        return this.users().find(user => user.id === id);
    }
    isFriendSignal = signal<boolean>(false);

    checkIfFriend(email: string) {
        this.userHttp.getFriends(this.currentUser().email).subscribe((friends: User[]) => {
            const isFriend = friends.some(friend => friend.email === email);
            this.isFriendSignal.set(isFriend);
        });
    }

    getFriends(email: string) {
        this.userHttp.getFriends(email).subscribe((friends: User[]) => {
            this.friendList.set(friends);
            console.log('Friends loaded:', friends);
        });
    }
    getUserByEmail(email: string) {
        const user = this.users().find(u => u.email === email);
        return user;
    }
  getFriends(email: string): Observable<User[]> {
    return this.userHttp.getFriends(email).pipe(
      tap((friends: User[]) => {
        this.friendList.set(friends);
        console.log('Friends loaded:', friends);
      })
    );
  }

  getUserByEmail(email: string): User | undefined {
    return this.users().find(user => user.email === email);
  }

}