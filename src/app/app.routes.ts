import { Routes } from '@angular/router';
import { DataComponent } from './components/data/data.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'data', component: DataComponent },
];
