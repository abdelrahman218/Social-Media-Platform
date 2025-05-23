import { RedirectCommand, Routes } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";
import { ResolveFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { UserService } from "./user.service";
import { User } from "../app.model";
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
    }
];