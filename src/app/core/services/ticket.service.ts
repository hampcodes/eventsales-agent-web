import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Page } from '../models/page.model';
import { TicketDetail } from '../models/ticket-detail.model';
import { TicketResponse } from '../models/ticket-response.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private http = inject(HttpClient);

  // Las entradas del participante que inició sesión: una página, filtrada por nombre del evento
  getMyTickets(name: string, page: number, size: number) {
    const params = new HttpParams()
      .set('name', name)
      .set('page', page)
      .set('size', size);
    return this.http.get<Page<TicketResponse>>(`${environment.apiUrl}/tickets/mine`, { params });
  }

  // Detalle de una de mis entradas, con su pago
  getTicket(id: number) {
    return this.http.get<TicketDetail>(`${environment.apiUrl}/tickets/${id}`);
  }

  // Solo se anulan entradas pendientes de pago (la API responde 400 si no)
  cancelTicket(id: number) {
    return this.http.patch<TicketResponse>(`${environment.apiUrl}/tickets/${id}/cancel`, {});
  }
}
