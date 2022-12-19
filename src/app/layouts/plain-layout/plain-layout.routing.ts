import { Routes } from '@angular/router';

import { RegistrationComponent } from '../../registration/registration.component';
import { LandingComponent } from '../../landing/landing.component';
import { LoginComponent } from 'app/login/login.component';

export const PlainLayoutRoutes: Routes = [
    { path: 'registration', component: RegistrationComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'login', component: LoginComponent }
];
