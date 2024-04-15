import { Routes } from '@angular/router';
import { DataComponent } from './components/data/data.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'data', component: DataComponent },
  { path: '', redirectTo: '/data', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
];
