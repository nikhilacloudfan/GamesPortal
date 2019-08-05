import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForiddenComponent } from './foridden/foridden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ManageusersComponent } from './admin-panel/manageusers/manageusers.component';
import { CreatecharacterComponent } from './admin-panel/createcharacter/createcharacter.component';
const routes: Routes = [

    {
        path: 'user', component: UserComponent,
        children: [
            {
                path: 'registration', component: RegistrationComponent
            },
            {
                path: 'login', component: LoginComponent
            },
            {
                path: '', component: LoginComponent
            }

        ]
    },
    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    },
    {
        path: 'forbidden', component: ForiddenComponent
    },
    {
        path: 'adminpanel', component: AdminPanelComponent, canActivate: [AuthGuard], data: {
            permittedRoles: ['Admin']
        },
        children: [
            { path: '', redirectTo: 'manageusers', pathMatch: 'full' },
            { path: 'manageusers', component: ManageusersComponent },
            { path: 'createcharacter', component: CreatecharacterComponent }
        ]
    },
    {
        path: '', redirectTo: '/user/login', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: '/user/login', pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})

export class AppRoutingModule { }