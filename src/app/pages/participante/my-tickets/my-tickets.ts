import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';
import { TicketDetail } from '../../../core/models/ticket-detail.model';
import { TicketResponse } from '../../../core/models/ticket-response.model';
import { TicketService } from '../../../core/services/ticket.service';

@Component({
  imports: [
    DatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
  ],
  selector: 'app-my-tickets',
  styleUrl: './my-tickets.css',
  templateUrl: './my-tickets.html',
})
export class MyTickets implements OnInit {
  private ticketService = inject(TicketService);

  // Buscador y paginador en un solo formulario: cualquier cambio vuelve a pedir la página
  filtrosForm = new FormGroup({
    name: new FormControl('', Validators.maxLength(100)),
    pagina: new FormControl(0),
    tamano: new FormControl(5),
  });

  entradas = signal<TicketResponse[]>([]);
  // La API devuelve la página pedida y el total de entradas
  total = signal(0);
  error = signal('');
  // Id de la entrada que espera confirmación para anularse
  porAnular = signal<number | null>(null);
  // Entrada cuyo detalle está abierto
  detalle = signal<TicketDetail | null>(null);

  ngOnInit() {
    this.cargarEntradas();
    // Al cambiar un filtro se vuelve a la primera página (sin pedir la lista dos veces)
    this.filtrosForm.controls.name.valueChanges.subscribe(() => this.filtrosForm.controls.pagina.setValue(0, { emitEvent: false }));
    this.filtrosForm.valueChanges.pipe(debounceTime(300)).subscribe(() => this.cargarEntradas());
  }

  cambiarPagina(evento: PageEvent) {
    this.filtrosForm.patchValue({ pagina: evento.pageIndex, tamano: evento.pageSize });
  }

  cargarEntradas() {
    if (this.filtrosForm.invalid) return;
    const filtros = this.filtrosForm.value;
    this.detalle.set(null);
    this.ticketService
      .getMyTickets(filtros.name ?? '', filtros.pagina ?? 0, filtros.tamano ?? 5)
      .subscribe({
        next: (respuesta) => {
          this.error.set('');
          this.entradas.set(respuesta.content);
          this.total.set(respuesta.totalElements);
        },
        error: (err) => this.error.set(err.error?.message ?? 'No se pudieron cargar tus entradas'),
      });
  }

  // Abre el detalle de una entrada; si ya estaba abierto, lo cierra
  verDetalle(id: number) {
    if (this.detalle()?.id === id) {
      this.detalle.set(null);
      return;
    }
    this.ticketService.getTicket(id).subscribe({
      next: (d) => this.detalle.set(d),
      error: (err) => this.error.set(err.error?.message ?? 'No se pudo cargar el detalle'),
    });
  }

  anular(id: number) {
    this.ticketService.cancelTicket(id).subscribe({
      next: () => {
        this.porAnular.set(null);
        this.cargarEntradas();
      },
      error: (err) => this.error.set(err.error?.message ?? 'No se pudo anular la entrada'),
    });
  }
}
