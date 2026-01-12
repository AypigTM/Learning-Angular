import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'profile',
    loadChildren: () =>
      import('./page/profile/profile.routes')
        .then(m => m.profileRoutes),
  },
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
];
