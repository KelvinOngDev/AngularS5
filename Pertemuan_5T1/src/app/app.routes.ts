import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Layout } from './layout/layout';
import { Menu1 } from './menu1/menu1';
import { Menu2 } from './menu2/menu2';
import { Menu3 } from './menu3/menu3';
import { Menu4 } from './menu4/menu4';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'menu1', component: Menu1 },
      { path: 'menu2', component: Menu2 },
      { path: 'menu3', component: Menu3 },
      { path: 'menu4', component: Menu4 },
    ],
  },
]; 
