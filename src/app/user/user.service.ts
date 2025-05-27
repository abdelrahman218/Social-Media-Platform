import { inject, Injectable, signal } from '@angular/core';
import { Friend, User, UserEssential } from '../app.model';
import { dummyUsers } from './dummy-users';
import { HttpUserService } from './http-user.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private users = signal<User[]>(dummyUsers);
    private currentUser = signal<User>(dummyUsers[0]);
    private userHttp = inject(HttpUserService);
    friendList = signal<User[]>([]);
 

    getAllUsers() {
        return this.users;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    login(email: string, password: string) {
        const user = this.users().find(u => u.email === email);
        if (user) {
            this.currentUser.set(user);
            return true;
        }
        return false;
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
    isFriend(id: number) {
        return this.currentUser().friendId?.includes(id) || false;
    }
  getFriends(email: string) {
    this.userHttp.getFriends(email).subscribe((friends: User[]) => {
      this.friendList.set(friends); // ✅ update signal
      console.log('Friends loaded:', friends);
    });
  }

}