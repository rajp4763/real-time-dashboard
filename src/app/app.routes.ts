import { Routes } from '@angular/router';
import { DataComponent } from './components/data/data.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'data', component: DataComponent },
  { path: 'login', component: LoginComponent },
];
