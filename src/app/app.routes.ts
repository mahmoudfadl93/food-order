import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
];
