import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatFormFieldModule, MatInputModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  cargando = signal(false);
  error = signal('');

  entrar() {
    this.cargando.set(true);
    this.error.set('');

    this.auth.login({
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
    }).subscribe({
      next: (sesion) => {
        this.cargando.set(false);
        // Si venía de un detalle de evento, vuelve ahí (solo rutas internas)
        const destino = this.route.snapshot.queryParamMap.get('returnUrl');
        if (destino?.startsWith('/') && !destino.startsWith('//') && sesion.role !== 'ORGANIZER') {
          this.router.navigateByUrl(destino);
        } else if (sesion.role === 'ORGANIZER') {
          this.router.navigateByUrl('/organizador/my-events');
        } else {
          this.router.navigateByUrl('/participante/events');
        }
      },
      error: (err) => {
        this.cargando.set(false);
        this.error.set(err.error?.message ?? 'No se pudo iniciar sesión');
      },
    });
  }
}
