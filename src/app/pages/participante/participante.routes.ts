import { Routes } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { paginatorEs } from '../../core/paginator-es';
import { ParticipanteLayout } from '../../layouts/participante-layout/participante-layout';

export const PARTICIPANTE_ROUTES: Routes = [
  {
    path: '',
    component: ParticipanteLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'events' },
      {
        path: 'events',
        providers: [{ provide: MatPaginatorIntl, useFactory: paginatorEs }],
        loadComponent: () => import('./events/events').then((m) => m.Events),
      },
      {
        path: 'assistant',
        // Chart.js se carga solo al abrir el asistente
        providers: [provideCharts(withDefaultRegisterables())],
        loadComponent: () => import('./assistant/assistant').then((m) => m.Assistant),
      },
      {
        path: 'my-tickets',
        loadComponent: () => import('./my-tickets/my-tickets').then((m) => m.MyTickets),
      },
    ],
  },
];
