import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // null = nadie ha iniciado sesión
  session = signal<LoginResponse | null>(this.leerSesion());

  login(datos: LoginRequest) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, datos).pipe(
      tap((respuesta) => {
        this.session.set(respuesta);
        localStorage.setItem('session', JSON.stringify(respuesta));
      }),
    );
  }

  // Crean la cuenta; no inician sesión: después el usuario entra por el login
  registerParticipant(datos: RegisterRequest) {
    return this.http.post(`${environment.apiUrl}/auth/register/participant`, datos);
  }

  registerOrganizer(datos: RegisterRequest) {
    return this.http.post(`${environment.apiUrl}/auth/register/organizer`, datos);
  }

  logout() {
    this.session.set(null);
    localStorage.removeItem('session');
    this.router.navigateByUrl('/login');
  }

  private leerSesion(): LoginResponse | null {
    const guardada = localStorage.getItem('session');
    return guardada ? JSON.parse(guardada) : null;
  }
}
