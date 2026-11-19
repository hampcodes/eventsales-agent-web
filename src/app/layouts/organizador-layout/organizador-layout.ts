import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../core/services/auth.service';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatButtonModule, MatListModule],
  selector: 'app-organizador-layout',
  styleUrl: './organizador-layout.css',
  templateUrl: './organizador-layout.html',
})
export class OrganizadorLayout {
  auth = inject(AuthService);
  menuAbierto = signal(true);

  alternarMenu() {
    this.menuAbierto.update((abierto) => !abierto);
  }
}
