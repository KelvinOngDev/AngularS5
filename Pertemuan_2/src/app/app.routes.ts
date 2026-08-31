import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contactus } from './contactus/contactus';

export const routes: Routes = [
  { path: '', component: Home }, 
  { path: 'about', component: About }, 
  { path: 'contactus', component: Contactus } 
];