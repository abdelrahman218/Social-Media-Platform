import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NoAuthGuard } from './guards/no-auth.guard';

export const AuthRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoAuthGuard]
    },
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [NoAuthGuard]
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    }
];
