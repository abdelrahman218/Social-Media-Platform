import { Injectable, signal } from '@angular/core';
import { User } from '../app.model';
import { dummyUsers } from './dummy-users'; 

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private users = signal<User[]>(dummyUsers);
    private currentUser = signal<User>(dummyUsers[0]);


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
}