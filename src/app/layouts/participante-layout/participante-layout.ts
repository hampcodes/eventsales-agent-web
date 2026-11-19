import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../core/services/auth.service';

@Component({
  imports: [RouterLink, RouterOutlet, MatButtonModule, MatToolbarModule],
  selector: 'app-participante-layout',
  styleUrl: './participante-layout.css',
  templateUrl: './participante-layout.html',
})
export class ParticipanteLayout {
  auth = inject(AuthService);
}
