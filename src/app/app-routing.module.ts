import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: 'home-page', loadChildren: () => import('./public/home/home.module').then((m) => m.HomeModule) },
  { path: 'notification', loadChildren: () => import('./public/notification/notification.module').then((m) => m.NotificationModule) },
  { path: '**', redirectTo: 'home-page' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
