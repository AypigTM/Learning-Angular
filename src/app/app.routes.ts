import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.routes')
        .then(m => m.userRoutes),
  },
];
