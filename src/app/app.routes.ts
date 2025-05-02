import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FeedComponent } from './feed/feed.component';
import { UserComponent } from './user/user.component';
import {routes as userRoutes} from './user/user.routes';
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
    }
];
