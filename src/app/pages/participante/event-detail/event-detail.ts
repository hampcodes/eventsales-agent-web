import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { EventResponse } from '../../../core/models/event-response.model';
import { AuthService } from '../../../core/services/auth.service';
import { EventService } from '../../../core/services/event.service';

@Component({
  imports: [DatePipe, UpperCasePipe, RouterLink, MatButtonModule, MatCardModule, MatDividerModule],
  selector: 'app-event-detail',
  styleUrl: './event-detail.css',
  templateUrl: './event-detail.html',
})
export class EventDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);
  auth = inject(AuthService);

  evento = signal<EventResponse | null>(null);
  error = signal('');

  // La API no vende entradas de eventos que ya pasaron (la fecha llega como AAAA-MM-DD)
  hoy = new Date().toLocaleDateString('en-CA');

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.eventService.getEvent(Number(params.get('id'))).subscribe({
        next: (evento) => {
          this.error.set('');
          this.evento.set(evento);
        },
        error: (err) => this.error.set(err.error?.message ?? 'No se pudo cargar el evento'),
      });
    });
  }
}
