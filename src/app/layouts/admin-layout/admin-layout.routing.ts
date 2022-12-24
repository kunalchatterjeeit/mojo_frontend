import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AuthGuard } from 'app/auth.guard';
import { SubscriptionComponent } from '../../subscription/subscription.component';
import { ViewSubscriptionsComponent } from '../../view-subscriptions/view-subscriptions.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'subscription', component: SubscriptionComponent, canActivate: [AuthGuard] },
    { path: 'subscriptions', component: ViewSubscriptionsComponent, canActivate: [AuthGuard] }
];
