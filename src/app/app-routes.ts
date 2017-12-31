import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { DashComponent } from './dash/dash.component';
import { ReporptComponent } from './reporpt/reporpt.component';

export const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'dash',
        component: DashComponent
    },
    {
        path: 'status/:name/:repo',
        component: ReporptComponent,
    },
    {
        path: 'about',
        component: AboutComponent
    }
];
