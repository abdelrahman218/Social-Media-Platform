import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FeedComponent } from './feed/feed.component';
import { UserComponent } from './user/user.component';
import {routes as userRoutes} from './user/user.routes';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';

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
        path:'super-admin-dashboard',
        component: SuperAdminDashboardComponent
     }
    // },
    // {
    //     path:'admin-dashboard',
    //     component: AdminDashboardComponent
    // },
    
];
