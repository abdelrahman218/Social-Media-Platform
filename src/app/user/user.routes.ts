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
const ProfileResolver: ResolveFn<User> = (route) => {
    return inject(UserService).getUserById(Number(route.paramMap.get('id'))!) || 
                 new RedirectCommand(inject(Router).parseUrl('/404'));
};
export const routes: Routes=[ 
    {
        path: 'profile'
        ,children: [{
            path: '',
            component:ProfileComponent,
        },
        {
            path: ':id',
            component: ProfileComponent,
            resolve: {User: ProfileResolver},
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