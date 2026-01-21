import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  { path: 'user', redirectTo: 'user/random', pathMatch: 'full' },

  {
    path: 'user/random',
    loadComponent: () =>
      import('./components/user-random/user-random.component').then((m) => m.UserRandomComponent),
    data: {breadcrumb: "Random"},
  },
  {
    path: 'user/:id',
    loadComponent: () =>
      import('./components/profile/profile.component').then((m) => m.ProfileComponent),
    data: {breadcrumb: "Profile"},

  },
  {
    path: 'user-liste',
    loadComponent: () =>
      import('./components/liste-user/liste-user.component').then((m) => m.ListeUserComponent),
        data: {breadcrumb: "Liste utilisateur"},
  },
  { path: '', redirectTo: 'user-liste', pathMatch: 'full' },
];
