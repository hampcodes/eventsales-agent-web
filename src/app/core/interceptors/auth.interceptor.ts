import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (peticion, siguiente) => {
  const auth = inject(AuthService);
  const token = auth.session()?.accessToken;

  // El login no lleva token: si hay uno vencido guardado, la API respondería 401 aunque la clave sea correcta
  const esLogin = peticion.url.includes('/auth/');

  if (token && !esLogin) {
    peticion = peticion.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return siguiente(peticion).pipe(
    catchError((err) => {
      // Token vencido o inválido en el resto de llamadas: se cierra la sesión y se vuelve al login
      if (err.status === 401 && !esLogin) {
        auth.logout();
      }
      return throwError(() => err);
    }),
  );
};
