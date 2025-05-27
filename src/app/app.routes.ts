import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FeedComponent } from './feed/feed.component';
import { UserComponent } from './user/user.component';
import {routes as userRoutes} from './user/user.routes';
import { AuthComponent } from './auth/auth.component';
import { AuthRoutes } from './auth/auth.routes';
import { NotFoundComponent } from './auth/not-found/not-found.component';
import { MessagesComponent } from './user/side-feed/messages/messages.component';
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
        path: 'auth',
        component: AuthComponent,
        children: AuthRoutes
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: 'direct-message/:id',
        loadComponent: () => import('./user/side-feed/messages/messages.component').then(m => m.MessagesComponent)
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];
