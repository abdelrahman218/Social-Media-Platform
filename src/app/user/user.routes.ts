import { RedirectCommand, Routes } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";

import { ResolveFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { UserService } from "./user.service";
import { User } from "../app.model";
import { MessagesComponent } from "./side-feed/messages/messages.component";
import { DirectMessagingComponent } from "./side-feed/direct-messaging/direct-messaging.component";
import { FriendsComponent } from "./side-feed/friends/friends.component";
import { SettingsComponent } from "./side-feed/settings/settings.component";
import { map } from "rxjs";
const ProfileResolver: ResolveFn<User> = (route) => {
    const userService = inject(UserService);
    const router = inject(Router);
    const email = route.paramMap.get('email')!;
    return userService.getUserByEmail(email).pipe(
        map(user => user ? user : new RedirectCommand(router.parseUrl('/404')))
    );
};
export const routes: Routes = [
    {
        path: 'profile'
        , children: [{
            path: '',
            component: ProfileComponent,
        },
        {
            path: ':email',
            component: ProfileComponent,
            resolve: { User: ProfileResolver },
        },
    ]
    },{
        path:'settings',
        component:SettingsComponent
    },{
        path:'messages',
        component:MessagesComponent
    },{
        path:'direct-messages/:email',
        component:DirectMessagingComponent
    },{
        path:'friends',
        component:FriendsComponent
    }
];