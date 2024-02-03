import { RouterModule, Routes, UrlSerializer } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
            { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'error', loadChildren: () => import('./components/error/error.module').then(m => m.ErrorModule) },
            { path: 'access-denied', loadChildren: () => import('./components/auth/access/access.module').then(m => m.AccessModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
