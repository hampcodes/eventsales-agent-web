import { Routes } from '@angular/router';
import { AuthLayout } from '../../layouts/auth-layout/auth-layout';

export const AUTH_ROUTES: Routes = [
  {
    // Esta pantalla lleva su propio panel de marca (texto distinto al del login), por eso va sin AuthLayout
    path: 'registro-organizador',
    loadComponent: () =>
      import('./signup-organizador/signup-organizador').then((m) => m.SignupOrganizador),
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', loadComponent: () => import('./login/login').then((m) => m.Login) },
      { path: 'registro', loadComponent: () => import('./signup/signup').then((m) => m.Signup) },
    ],
  },
];
