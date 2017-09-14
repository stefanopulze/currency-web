import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './page/dashboard/dashboard.component';
import {ProfileComponent} from './page/profile/profile.component';
import {TagsComponent} from "./page/tags/tags.component";

const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'tags', component: TagsComponent},
  {path: 'login', loadChildren: './login/login.module#LoginModule'}
];

export const routing = RouterModule.forRoot(appRoutes, {useHash: true})
