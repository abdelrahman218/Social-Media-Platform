import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FeedComponent } from './feed/feed.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'feed',
        component: FeedComponent
    }
];
