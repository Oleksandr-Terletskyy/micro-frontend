import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      loadRemoteModule('dashboard', './Component').then((m) => m.AppComponent),
  },
  {
    path: 'assets',
    loadChildren: () =>
      loadRemoteModule('assets', './Routes').then((m) => m.routes),
  },
  {
    path: 'findings',
    loadChildren: () =>
      loadRemoteModule('findings', './Routes').then((m) => m.routes),
  },
  {
    path: 'users',
    loadComponent: () =>
      loadRemoteModule('users', './Component').then((m) => m.AppComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      loadRemoteModule('settings', './Component').then((m) => m.AppComponent),
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
