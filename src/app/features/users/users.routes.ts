import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/profile.component').then(m => m.ProfileComponent),
  },
  {
    path: 'user-liste',
    loadComponent: () =>
      import('./components/liste-user/liste-user.component').then(m => m.ListeUserComponent),
  },
];
