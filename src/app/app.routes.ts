import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Portfolio } from './pages/portfolio/portfolio';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { 
    path: '', 
    component: Home, // اسم الكلاس الصافي
    title: 'Youssef Salah'
  },
  { 
    path: 'about', 
    component: About,
    title: 'About Me'
  },
  { 
    path: 'portfolio', 
    component: Portfolio,
    title: 'Portfolio - My Works'
  },
  { 
    path: 'contact', 
    component: Contact,
    title: 'Contact Me'
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  }
];