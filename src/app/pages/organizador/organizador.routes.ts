import { Routes } from '@angular/router';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { paginatorEs } from '../../core/paginator-es';
import { OrganizadorLayout } from '../../layouts/organizador-layout/organizador-layout';

export const ORGANIZADOR_ROUTES: Routes = [
  {
    path: '',
    component: OrganizadorLayout,
    children: [
      {
        path: 'dashboard',
        providers: [provideCharts(withDefaultRegisterables())],
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.DashboardPage),
      },
      {
        path: 'my-events',
        // Textos del paginador en español, solo para esta pantalla
        providers: [{ provide: MatPaginatorIntl, useFactory: paginatorEs }],
        loadComponent: () => import('./my-events/my-events').then((m) => m.MyEvents),
      },
      {
        // El mismo asistente del participante, con textos y gráficos para el organizador
        path: 'assistant',
        providers: [provideCharts(withDefaultRegisterables())],
        loadComponent: () => import('../participante/assistant/assistant').then((m) => m.Assistant),
      },
      {
        // El mismo formulario crea (sin id) y edita (con id)
        path: 'event-form',
        providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'es-PE' }],
        loadComponent: () => import('./event-form/event-form').then((m) => m.EventForm),
      },
      {
        path: 'event-form/:id',
        providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'es-PE' }],
        loadComponent: () => import('./event-form/event-form').then((m) => m.EventForm),
      },
    ],
  },
];
