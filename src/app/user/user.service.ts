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
    private currentUser = signal<User | null>(this.loadUserFromStorage() || null);
    private userHttp = inject(HttpUserService);
    friendList = signal<User[]>([]);

    private loadUserFromStorage(): User | null {
        const stored = localStorage.getItem('user');
        if (!stored) return null;

        try {
            const user = JSON.parse(stored);
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
    }

    register(user: User) {
        if (this.users().find(u => u.email === user.email)) {
            throw new Error('User with this email already exists');
        }
        this.users.update(users => [...users, user]);
        return user;
    }

    updateUser(email: string, name: string, password: string, profilePicURL: File | null | undefined, bio: string): Observable<void> {
        return this.userHttp.updateUser(
            email, name, password, profilePicURL, bio
        ).pipe(
            tap(() => {
                const updatedUser: User = {
                    ...this.currentUser(),
                    email,
                    full_name: name,
                    password,
                    profilePicURL: profilePicURL?.name
                        ? 'usersImages/image_' + email + '_' + profilePicURL.name
                        : this.currentUser()?.profilePicURL,
                    bio
                } as User;
                // Update users signal
                this.users.update(users =>
                    users.map(user => user.email === email ? updatedUser : user)
                );
                this.currentUser.set(updatedUser);
                // Update localStorage
                console.log("currentUser:",this.currentUser());
                console.log("updatedUser:",updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
            })
        );
    }
    getUserById(id: number) {
        return this.users().find(user => user.id === id);
    }
    isFriendSignal = signal<boolean>(false);

    checkIfFriend(email: string) {
        const currentUser = this.currentUser();
        if (!currentUser || !currentUser.email) {
            this.isFriendSignal.set(false);
            return;
        }
        this.userHttp.getFriends(currentUser.email).subscribe((friends: User[]) => {
            const isFriend = friends.some(friend => friend.email === email);
            this.isFriendSignal.set(isFriend);
        });
    }
    getFriends(email: string): Observable<User[]> {
        return this.userHttp.getFriends(email).pipe(
            tap((friends: User[]) => {
                this.friendList.set(friends);
                console.log('Friends list updated:', friends);
            })
        );
    }

    getUserByEmail(email: string): Observable<User | undefined> {
        return this.userHttp.getUserByEmail(email).pipe(
            tap({
                next: (user: User) => {
                    this.users.update(users => [...users, user]);
                    if (this.currentUser()?.email === email) {
                        this.currentUser.set(user);
                        localStorage.setItem('user', JSON.stringify(user));
                    }
                },
                error: (error) => {
                    console.error('Error fetching user by email:', error);
                }
            })
        );
    }
 
    togglePrivateMode(email: string): Observable<void> {
        return this.userHttp.togglePrivateMode(email).pipe(
            tap(() => {
                const currentUser = this.currentUser();
                if (currentUser && currentUser.email === email) {
                    currentUser.isPrivate = !currentUser.isPrivate;
                    console.log('Toggled private mode for user:', currentUser);
                    this.currentUser.set(currentUser);
                    localStorage.setItem('user', JSON.stringify(currentUser));
                }
            })
        );
    }
}