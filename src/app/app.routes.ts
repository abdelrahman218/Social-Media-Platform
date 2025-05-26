import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FeedComponent } from './feed/feed.component';
import { UserComponent } from './user/user.component';
import {routes as userRoutes} from './user/user.routes';
import { AuthComponent } from './auth/auth.component';
import { AuthRoutes } from './auth/auth.routes';
import { NotFoundComponent } from './auth/not-found/not-found.component';
import { DirectMessagingComponent } from './direct-messaging/direct-messaging.component';
export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'feed',
        component: FeedComponent
    },
    {
        path:'user',
        component: UserComponent,
        children:userRoutes
    },
    {
<<<<<<< HEAD
        path:'direct-messaging',
        component:DirectMessagingComponent
    },
    {
=======
>>>>>>> f745c34cdfe6a3e48851b9633003a284ed83920b
        path: 'auth',
        component: AuthComponent,
        children: AuthRoutes
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];
