import { Routes } from '@angular/router';
import { organizerGuard } from './core/guards/organizer.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', loadComponent: () => import('./home/home').then((m) => m.Home) },
  {
    path: 'organizador',
    canActivate: [organizerGuard],
    loadChildren: () => import('./pages/organizador/organizador.routes').then((m) => m.ORGANIZADOR_ROUTES),
  },
  {
    // Detalle público: se puede ver sin sesión; para pagar se pide iniciar sesión
    path: 'evento/:id',
    loadComponent: () =>
      import('./layouts/participante-layout/participante-layout').then((m) => m.ParticipanteLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/participante/event-detail/event-detail').then((m) => m.EventDetail),
      },
    ],
  },
  {
    path: 'participante',
    loadChildren: () => import('./pages/participante/participante.routes').then((m) => m.PARTICIPANTE_ROUTES),
  },
  { path: 'terminos', loadComponent: () => import('./pages/terminos/terminos').then((m) => m.Terminos) },
  { path: '', loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES) },
];
