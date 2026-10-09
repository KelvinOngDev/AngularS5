import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'route1'
  },
  {
    path: 'route1',
    title: 'Route 1 | Mahasiswa',
    loadComponent: () => import('./backend/backend').then((module) => module.Backend)
  },
  {
    path: 'route2',
    title: 'Route 2 | Telephone',
    loadComponent: () => import('./backend/telephone-page').then((module) => module.TelephonePage)
  },
  {
    path: 'route3',
    title: 'Route 3 | Angular Routing',
    loadComponent: () => import('./route3/route3').then((module) => module.Route3)
  },
  {
    path: 'backend',
    title: 'Backend Data | Angular Routing',
    loadComponent: () => import('./backend/backend').then((module) => module.Backend)
  },
  {
    path: 'telephone',
    title: 'Telephone Data | Angular Routing',
    loadComponent: () => import('./backend/telephone-page').then((module) => module.TelephonePage)
  },
  {
    path: '**',
    redirectTo: 'route1'
  }
];
