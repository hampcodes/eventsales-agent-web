import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatFormFieldModule, MatInputModule],
  selector: 'app-signup-organizador',
  styleUrl: './signup-organizador.css',
  templateUrl: './signup-organizador.html',
})
export class SignupOrganizador {
  private auth = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    ruc: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(9)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  cargando = signal(false);
  error = signal('');

  crear() {
    this.cargando.set(true);
    this.error.set('');

    this.auth.registerOrganizer({
      name: this.form.value.nombre ?? '',
      documentId: this.form.value.ruc ?? '',
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
      phone: this.form.value.telefono ?? '',
    }).subscribe({
      next: () => {
        this.cargando.set(false);
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.cargando.set(false);
        this.error.set(err.error?.message ?? 'No se pudo crear la cuenta');
      },
    });
  }
}
