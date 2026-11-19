import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const organizerGuard: CanActivateFn = () => {
  const esOrganizador = inject(AuthService).session()?.role === 'ORGANIZER';
  return esOrganizador || inject(Router).createUrlTree(['/login']);
};
