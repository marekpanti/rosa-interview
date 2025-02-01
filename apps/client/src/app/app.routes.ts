import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/availability', pathMatch: 'full' },
  {
    path: 'availability',
    loadComponent: () =>
      import('./features/availabilities/availabilities.component').then(
        (component) => component.AvailabilityComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        (component) => component.PageNotFoundComponent
      ),
  },
];
