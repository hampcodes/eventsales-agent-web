import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatFormFieldModule, MatInputModule],
  selector: 'app-signup',
  styleUrl: './signup.css',
  templateUrl: './signup.html',
})
export class Signup {
  private auth = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    dni: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  cargando = signal(false);
  error = signal('');

  crear() {
    this.cargando.set(true);
    this.error.set('');

    this.auth.registerParticipant({
      name: this.form.value.nombre ?? '',
      documentId: this.form.value.dni ?? '',
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
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
