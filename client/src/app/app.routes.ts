import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MembersDetailComponent } from './members/members-detail/members-detail.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'members', component: MembersListComponent, canActivate: [authGuard] },
    { path: 'members/:id', component: MembersDetailComponent, canActivate: [authGuard] },
    { path: 'lists', component: ListComponent, canActivate: [authGuard] },
    { path: 'messages', component: MessagesComponent, canActivate: [authGuard] },
    { path: '**', component: HomeComponent, pathMatch: 'full' }
];
