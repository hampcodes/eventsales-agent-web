import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EventResponse } from '../core/models/event-response.model';
import { HomeService } from '../core/services/home.service';

@Component({
  imports: [
    DatePipe,
    UpperCasePipe,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatToolbarModule,
  ],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private homeService = inject(HomeService);

  // Vienen de la API (GET /home)
  eventos = signal<EventResponse[]>([]);
  error = signal('');

  ejemplos = [
    '¿Qué eventos hay en Cusco?',
    '¿Cuántos cupos quedan en Lima?',
    'Quiero comprar una entrada de la Feria Gastronómica',
    '¿Cómo funcionan los reembolsos?',
  ];

  pasos = [
    { numero: '1', titulo: 'Elige tu evento', texto: 'Explora los eventos y revisa su fecha, ciudad, precio y cupos disponibles.', imagen: 'paso-elige.jpg', alt: 'Escenario de un concierto con luces de colores' },
    { numero: '2', titulo: 'Compra con HampCode', texto: 'En el detalle del evento pulsa «Comprar con HampCode»: el agente te muestra el evento y el precio, y confirmas la compra con un botón.', imagen: 'paso-compra.jpg', alt: 'Persona pagando con tarjeta frente a una laptop' },
    { numero: '3', titulo: 'Consulta tus entradas', texto: 'Encuentra tus entradas y su estado en Mis entradas.', imagen: 'paso-entradas.jpg', alt: 'Asistentes disfrutando de un concierto' },
  ];

  ngOnInit() {
    this.homeService.getHome().subscribe({
      next: (home) => {
        this.eventos.set(home.upcomingEvents);
      },
      error: (err) => this.error.set(err.error?.message ?? 'No se pudieron cargar los eventos'),
    });
  }
}
